import currentCollection1Image from '../../../assets/images/Current-Collection-1.jpg'

export function PreviousCollectionFeaturedMedia() {
    return (
        <section aria-labelledby="featured-media-heading" className="space-y-3">
            <h2 id="featured-media-heading" className="sr-only">
                Featured media
            </h2>
            <figure className="overflow-hidden rounded-2xl border border-black/10 shadow-[var(--shadow-soft)]">
                <img
                    src={currentCollection1Image}
                    alt="Featured SS 25 obsidian artifact displayed in a room interior."
                    className="h-66 w-full object-cover"
                />
            </figure>
            <div className="sr-only">
                <p>Upper annotation label and lower annotation label are present in the visual design.</p>
            </div>
        </section>
    )
}
