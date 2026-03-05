import { PreviousCollectionBottomNavigation } from '../../features/previousCollection/components/PreviousCollectionBottomNavigation'
import { PreviousCollectionFeaturedMedia } from '../../features/previousCollection/components/PreviousCollectionFeaturedMedia'
import { PreviousCollectionHeader } from '../../features/previousCollection/components/PreviousCollectionHeader'
import { PreviousCollectionIntro } from '../../features/previousCollection/components/PreviousCollectionIntro'
import { PreviousCollectionSupportingContent } from '../../features/previousCollection/components/PreviousCollectionSupportingContent'

export function PreviousCollectionPage() {
    return (
        <div className="relative flex min-h-dvh flex-col overflow-hidden text-[color:var(--text-primary)]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_68%)]"
            />
            <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-8 px-4 pb-6 pt-[4.5rem] sm:px-6 lg:gap-10 lg:px-8">
                <PreviousCollectionHeader />
                <main className="flex flex-1 flex-col gap-8 lg:gap-9" aria-labelledby="previous-collection-title">
                    <PreviousCollectionIntro />
                    <PreviousCollectionFeaturedMedia />
                    <PreviousCollectionSupportingContent />
                </main>
                <PreviousCollectionBottomNavigation />
            </div>
        </div>
    )
}
