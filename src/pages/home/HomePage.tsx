import { HeroSection } from '../../features/home/components/HeroSection'
import { HomeFooter } from '../../features/home/components/HomeFooter'
import { HomeHeader } from '../../features/home/components/HomeHeader'

export function HomePage() {
    return (
        <div className="relative flex min-h-dvh flex-col overflow-hidden text-[color:var(--text-primary)]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_68%)]"
            />
            <HomeHeader />
            <main className="relative flex-1">
                <div className="mx-auto flex w-full max-w-6xl flex-1 px-4 pb-8 pt-2 sm:px-6 lg:px-8">
                    <HeroSection />
                </div>
            </main>
            <HomeFooter />
        </div>
    )
}
