#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const commandParts = process.argv.slice(2)

if (commandParts.length === 0) {
    console.error('Usage: node scripts/run-with-nix-ld.mjs <command> [args...]')
    process.exit(1)
}

const providedLibgmPath = process.env.LIBGM_PATH

const hasLibgmInDir = (dirPath) =>
    existsSync(path.join(dirPath, 'libgm.so'))

const candidateLibDirs = [
    '/run/current-system/sw/lib',
    '/usr/lib',
    '/usr/lib64',
    '/lib',
    '/lib64',
]

const detectFromNixStore = () => {
    if (!existsSync('/nix/store')) {
        return undefined
    }

    const findResult = spawnSync(
        'find',
        ['/nix/store', '-maxdepth', '4', '-type', 'f', '-name', 'libgm.so'],
        { encoding: 'utf8' },
    )

    if (findResult.status !== 0 || !findResult.stdout) {
        return undefined
    }

    const firstMatch = findResult.stdout
        .split('\n')
        .map((line) => line.trim())
        .find(Boolean)

    if (!firstMatch) {
        return undefined
    }

    return path.dirname(firstMatch)
}

const detectedLibgmPath = candidateLibDirs.find(hasLibgmInDir) || detectFromNixStore()

const libgmPath = providedLibgmPath && hasLibgmInDir(providedLibgmPath)
    ? providedLibgmPath
    : detectedLibgmPath

if (!libgmPath) {
    console.error(
        'Unable to resolve LIBGM_PATH automatically. Set LIBGM_PATH to the directory containing libgm.so and retry.',
    )
    process.exit(1)
}

const env = { ...process.env }
env.LIBGM_PATH = libgmPath
env.NIX_LD_LIBRARY_PATH = [
    libgmPath,
    env.NIX_LD_LIBRARY_PATH || '',
]
    .filter(Boolean)
    .join(':')

env.LD_LIBRARY_PATH = [
    libgmPath,
    env.LD_LIBRARY_PATH || '',
]
    .filter(Boolean)
    .join(':')

const command = commandParts[0]
const args = commandParts.slice(1)

console.log(`Using LIBGM_PATH=${libgmPath}`)

const result = spawnSync(command, args, {
    stdio: 'inherit',
    env,
    shell: process.platform === 'win32',
})

if (result.error) {
    console.error(result.error.message)
    process.exit(1)
}

process.exit(result.status ?? 1)
