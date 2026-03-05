import { Link } from 'react-router-dom'

export function PreviousCollectionBottomNavigation() {
    return (
        <footer className="relative z-10 w-full pt-1">
            <nav
                aria-label="Bottom"
                className="mx-auto w-full rounded-full border border-[color:var(--panel-border)] bg-[color:var(--panel-background)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-md sm:px-6"
            >
                <ul className="flex items-center justify-around gap-4 text-sm tracking-[0.14em] text-[color:var(--text-secondary)] sm:text-base">
                    <li>
                        <Link
                            to="/"
                            aria-label="Go to Home"
                            className="rounded-full px-3 py-2 transition hover:bg-white/40 hover:text-[color:var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <a
                            href="#"
                            aria-label="Go to Collections"
                            aria-current="page"
                            className="rounded-full px-3 py-2 transition hover:bg-white/40 hover:text-[color:var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Collections
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            aria-label="Go to Orders"
                            className="rounded-full px-3 py-2 transition hover:bg-white/40 hover:text-[color:var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Orders
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}
