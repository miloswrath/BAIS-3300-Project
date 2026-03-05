import { Link } from 'react-router-dom'

export function PreviousCollectionBottomNavigation() {
    return (
        <footer>
            <nav aria-label="Bottom" className="flex items-center justify-center gap-8 text-sm sm:text-base">
                <Link to="/" className="rounded-full px-3 py-2 hover:bg-white/40">
                    Home
                </Link>
                <a href="#" className="rounded-full px-3 py-2 hover:bg-white/40">
                    Collections
                </a>
                <a href="#" className="rounded-full px-3 py-2 hover:bg-white/40">
                    Orders
                </a>
            </nav>
        </footer>
    )
}
