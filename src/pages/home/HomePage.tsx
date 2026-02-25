import { HeroSection } from '../../features/home/components/HeroSection'
import { HomeFooter } from '../../features/home/components/HomeFooter'
import { HomeHeader } from '../../features/home/components/HomeHeader'

export function HomePage() {
    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-zinc-100 text-zinc-900">
            <HomeHeader />
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-5xl px-6 py-8">
                    <HeroSection />
                </div>
            </main>
            <HomeFooter />
        </div>
    )
}
