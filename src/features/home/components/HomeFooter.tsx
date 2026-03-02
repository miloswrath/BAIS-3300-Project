export function HomeFooter() {
    return (
        <footer className="relative z-10 w-full px-4 pb-4 pt-2 sm:px-6 sm:pb-6 lg:px-8">
            <nav
                aria-label="Footer"
                className="mx-auto max-w-6xl rounded-full border border-[color:var(--panel-border)] bg-[color:var(--panel-background)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-md sm:px-6"
            >
                <ul className="flex items-center justify-around gap-4 text-sm tracking-[0.14em] text-[color:var(--text-secondary)] sm:text-base">
                    <li>
                        <a
                            href="#"
                            aria-label="Go to Home"
                            className="rounded-full px-3 py-2 transition hover:bg-white/40 hover:text-[color:var(--text-primary)]"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            aria-label="Go to Collections"
                            className="rounded-full px-3 py-2 transition hover:bg-white/40 hover:text-[color:var(--text-primary)]"
                        >
                            Collections
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            aria-label="Go to Orders"
                            className="rounded-full px-3 py-2 transition hover:bg-white/40 hover:text-[color:var(--text-primary)]"
                        >
                            Orders
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}
