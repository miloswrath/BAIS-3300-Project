export function HomeFooter() {
    return (
        <footer className="w-full border-t border-zinc-200">
            <nav aria-label="Footer" className="mx-auto max-w-5xl px-6 py-4">
                <ul className="flex items-center justify-around gap-4 text-base">
                    <li>
                        <a href="#" aria-label="Go to Home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="Go to Collections">
                            Collections
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="Go to Orders">
                            Orders
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}
