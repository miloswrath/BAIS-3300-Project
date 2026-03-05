import currentCollection1Image from '../../../assets/images/Current-Collection-1.jpg'
import { previousCollectionContent } from '../data/previousCollectionContent'

export function PreviousCollectionFeaturedMedia() {
    return (
        <section aria-labelledby="featured-media-heading" className="space-y-3">
            <h2 id="featured-media-heading" className="sr-only">
                Featured media
            </h2>
            <figure className="relative overflow-hidden rounded-[1.4rem] border border-black/15 shadow-[0_20px_44px_rgba(32,24,21,0.2)]">
                <img
                    src={currentCollection1Image}
                    alt="Featured SS 25 obsidian artifact displayed in a room interior."
                    className="h-[18rem] w-full object-cover sm:h-[21rem] lg:h-[31rem]"
                />

                <figcaption className="sr-only">
                    Featured image with upper and lower annotation callouts highlighting key details.
                </figcaption>

                <div
                    aria-hidden="true"
                    className="absolute right-6 top-16 flex flex-col items-end gap-2 lg:right-14 lg:top-28 lg:gap-3"
                >
                    <p className="rounded-full bg-[rgba(232,232,232,0.85)] px-4 py-1 text-[0.65rem] tracking-wide text-black lg:px-5 lg:py-1.5 lg:text-[0.86rem]">
                        {previousCollectionContent.annotationUpper}
                    </p>
                    <span className="h-10 w-px rotate-[28deg] bg-[rgba(228,228,228,0.95)] lg:h-16" />
                </div>

                <div
                    aria-hidden="true"
                    className="absolute bottom-14 left-8 flex flex-col items-start gap-2 lg:bottom-24 lg:left-16 lg:gap-3"
                >
                    <p className="rounded-full bg-[rgba(232,232,232,0.85)] px-4 py-1 text-[0.65rem] tracking-wide text-black lg:px-5 lg:py-1.5 lg:text-[0.86rem]">
                        {previousCollectionContent.annotationLower}
                    </p>
                    <span className="h-12 w-px -rotate-[35deg] bg-[rgba(228,228,228,0.95)] lg:h-18" />
                </div>
            </figure>
            <div className="sr-only">
                <p>Upper annotation label and lower annotation label are present in the visual design.</p>
            </div>
        </section>
    )
}
