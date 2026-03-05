import { previousCollectionContent, previousCollectionSupportingCards } from '../data/previousCollectionContent'

export function PreviousCollectionSupportingContent() {
    return (
        <section
            aria-labelledby="supporting-content-heading"
            className="grid grid-cols-[2fr_1fr] items-start gap-4 lg:gap-7"
        >
            <h2 id="supporting-content-heading" className="sr-only">
                Supporting content
            </h2>
            <ul aria-label="Collection supporting media" className="grid grid-cols-2 gap-3" role="list">
                {previousCollectionSupportingCards.map((contentCard) => (
                    <li
                        key={contentCard.id}
                        aria-label={contentCard.label}
                        className="h-[4.5rem] rounded-xl border border-[color:var(--panel-border)] bg-[color:var(--panel-background)] shadow-[0_8px_20px_rgba(32,24,21,0.06)] sm:h-[4.8rem] lg:h-[8.4rem]"
                    />
                ))}
            </ul>
            <aside aria-label="Supporting description">
                <p className="text-base leading-7 text-[color:var(--text-secondary)] lg:text-[1.2rem] lg:leading-9">
                    {previousCollectionContent.supportingDescription}
                </p>
            </aside>
        </section>
    )
}
