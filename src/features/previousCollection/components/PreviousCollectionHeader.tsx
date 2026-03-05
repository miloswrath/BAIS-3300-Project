export function PreviousCollectionHeader() {
    return (
        <header>
            <nav aria-label="Primary" className="flex items-center justify-between gap-4">
                <button
                    type="button"
                    aria-label="Open navigation menu"
                    className="rounded-full border border-black/15 px-3 py-2 text-sm text-[color:var(--text-secondary)]"
                >
                    Menu
                </button>
                <p className="font-[family-name:var(--font-serif)] text-lg">Obsidian Artifact Co.</p>
                <button type="button" className="rounded-full bg-black px-4 py-2 text-sm text-white">
                    Example Button
                </button>
            </nav>
        </header>
    )
}
