import { previousCollectionContent } from '../data/previousCollectionContent'

export function PreviousCollectionIntro() {
    return (
        <section aria-labelledby="previous-collection-title" className="space-y-2.5">
            <p className="font-[family-name:var(--font-serif)] text-sm text-[color:var(--text-secondary)] lg:text-[0.95rem]">
                {previousCollectionContent.eyebrow}
            </p>
            <h1
                id="previous-collection-title"
                className="font-[family-name:var(--font-serif)] text-[2.9rem] leading-[0.95] tracking-[0.01em] lg:text-[4.8rem]"
            >
                {previousCollectionContent.title}
            </h1>
            <p className="max-w-[36ch] text-base leading-7 text-[color:var(--text-secondary)] lg:max-w-[56ch] lg:text-[1.25rem] lg:leading-9">
                {previousCollectionContent.description}
            </p>
        </section>
    )
}
