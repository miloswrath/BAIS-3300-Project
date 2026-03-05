import { PreviousCollectionBottomNavigation } from '../../features/previousCollection/components/PreviousCollectionBottomNavigation'
import { PreviousCollectionFeaturedMedia } from '../../features/previousCollection/components/PreviousCollectionFeaturedMedia'
import { PreviousCollectionHeader } from '../../features/previousCollection/components/PreviousCollectionHeader'
import { PreviousCollectionIntro } from '../../features/previousCollection/components/PreviousCollectionIntro'
import { PreviousCollectionSupportingContent } from '../../features/previousCollection/components/PreviousCollectionSupportingContent'

export function PreviousCollectionPage() {
    return (
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-8 px-6 pb-10 pt-18 text-[color:var(--text-primary)]">
            <PreviousCollectionHeader />
            <main className="flex flex-1 flex-col gap-8" aria-labelledby="previous-collection-title">
                <PreviousCollectionIntro />
                <PreviousCollectionFeaturedMedia />
                <PreviousCollectionSupportingContent />
            </main>
            <PreviousCollectionBottomNavigation />
        </div>
    )
}
