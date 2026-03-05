const contentCards = [
    { id: 'card-1', label: 'Supporting card 1' },
    { id: 'card-2', label: 'Supporting card 2' },
    { id: 'card-3', label: 'Supporting card 3' },
    { id: 'card-4', label: 'Supporting card 4' },
]

export function PreviousCollectionSupportingContent() {
    return (
        <section aria-labelledby="supporting-content-heading" className="grid grid-cols-[2fr_1fr] gap-4">
            <h2 id="supporting-content-heading" className="sr-only">
                Supporting content
            </h2>
            <ul aria-label="Collection supporting media" className="grid grid-cols-2 gap-3">
                {contentCards.map((contentCard) => (
                    <li
                        key={contentCard.id}
                        aria-label={contentCard.label}
                        className="h-18 rounded-xl bg-black/12"
                    />
                ))}
            </ul>
            <aside aria-label="Supporting description">
                <p className="font-[family-name:var(--font-serif)] text-sm leading-6 text-[color:var(--text-secondary)]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
            </aside>
        </section>
    )
}
