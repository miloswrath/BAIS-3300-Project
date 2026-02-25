export function HomeHeader() {
    return (
        <header className="w-full">
            <nav aria-label="Primary" className="mx-auto max-w-5xl px-6 py-4">
                <ul className="flex items-center justify-between gap-4">
                    <li>
                        <button type="button" aria-label="Open navigation menu" className="font-medium">
                            Menu
                        </button>
                    </li>
                    <li className="flex-1 text-center font-serif text-xl">Obsidian Artifact Co.</li>
                    <li>
                        <button type="button" className="rounded-full bg-black px-4 py-2 text-sm text-white">
                            Open Cart
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
