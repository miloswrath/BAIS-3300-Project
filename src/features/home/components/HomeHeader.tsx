export function HomeHeader() {
    return (
        <header className="relative z-10 w-full px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
            <nav
                aria-label="Primary"
                className="mx-auto max-w-6xl rounded-full border border-[color:var(--panel-border)] bg-[color:var(--panel-background)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-md sm:px-6"
            >
                <ul className="flex items-center justify-between gap-3 sm:gap-4">
                    <li>
                        <button
                            type="button"
                            aria-label="Open navigation menu"
                            className="rounded-full border border-black/10 px-3 py-2 text-sm font-medium tracking-[0.18em] text-[color:var(--text-secondary)] transition hover:border-black/20 hover:text-[color:var(--text-primary)]"
                        >
                            Menu
                        </button>
                    </li>
                    <li className="flex-1 text-center font-[family-name:var(--font-serif)] text-lg tracking-[0.22em] sm:text-xl">
                        Obsidian Artifact Co.
                    </li>
                    <li>
                        <button
                            type="button"
                            className="rounded-full bg-[color:var(--text-primary)] px-4 py-2 text-sm font-medium text-stone-50 transition hover:bg-black"
                        >
                            Open Cart
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
