import { useRef, useState } from 'react'
import { currentCollectionSlides, previousCollections } from '../data/previousCollections'

export function HeroSection() {
    const [activeCollectionIndex, setActiveCollectionIndex] = useState(0)
    const currentCollectionObjectPositions = ['center 50%', 'center 50%', 'center 45%']
    const currentCollectionScales = [1, 1.12, 1.14]
    const lastSlideChangeAtRef = useRef(0)
    const touchStartYRef = useRef<number | null>(null)
    const previousCollectionObjectPositionById: Record<string, string> = {
        ss25: 'center 62%',
        fw25: 'center 50%',
        ss24: 'center 42%',
    }

    const SLIDE_CHANGE_COOLDOWN_MS = 380
    const TOUCH_THRESHOLD_PX = 24
    const activeSlide = currentCollectionSlides[activeCollectionIndex]

    const moveSlide = (direction: 1 | -1) => {
        const currentTime = Date.now()

        if (currentTime - lastSlideChangeAtRef.current < SLIDE_CHANGE_COOLDOWN_MS) {
            return
        }

        lastSlideChangeAtRef.current = currentTime

        setActiveCollectionIndex((previousIndex) => {
            const nextIndex = previousIndex + direction
            const totalSlides = currentCollectionSlides.length

            if (nextIndex < 0) {
                return totalSlides - 1
            }

            if (nextIndex >= totalSlides) {
                return 0
            }

            return nextIndex
        })
    }

    return (
        <section aria-labelledby="hero-title" className="flex w-full flex-col gap-6 lg:gap-8">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:items-end">
                <div className="space-y-4">
                    <p className="text-xs font-medium uppercase tracking-[0.34em] text-[color:var(--text-secondary)]">
                        Studio release
                    </p>
                    <h1
                        id="hero-title"
                        className="max-w-[11ch] font-[family-name:var(--font-serif)] text-5xl leading-none sm:text-6xl lg:text-7xl"
                    >
                        Obsidian Artifact Co.
                    </h1>
                </div>
                <p className="max-w-xl text-base leading-7 text-[color:var(--text-secondary)] sm:text-lg">
                    Hand-finished obsidian forms shaped for display, collected in seasonal drops, and presented with
                    the restraint of a modern gallery catalog.
                </p>
            </div>

            <article
                aria-labelledby="current-collection-heading"
                aria-describedby="current-collection-description current-collection-instructions current-collection-status"
                className="relative isolate overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(145deg,rgba(34,24,21,0.94),rgba(72,48,40,0.88))] text-white shadow-[0_30px_80px_rgba(32,24,21,0.22)] touch-none"
                onWheel={(event) => {
                    if (Math.abs(event.deltaY) < 6) {
                        return
                    }

                    event.preventDefault()
                    moveSlide(event.deltaY > 0 ? 1 : -1)
                }}
                onTouchStart={(event) => {
                    touchStartYRef.current = event.touches[0].clientY
                }}
                onTouchMove={(event) => {
                    if (touchStartYRef.current === null) {
                        return
                    }

                    const deltaY = touchStartYRef.current - event.touches[0].clientY

                    if (Math.abs(deltaY) < TOUCH_THRESHOLD_PX) {
                        return
                    }

                    event.preventDefault()
                    moveSlide(deltaY > 0 ? 1 : -1)
                    touchStartYRef.current = event.touches[0].clientY
                }}
                onTouchEnd={() => {
                    touchStartYRef.current = null
                }}
            >
                <div className="grid min-h-[32rem] md:min-h-[34rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
                    <div className="relative flex flex-col justify-between gap-8 p-5 sm:p-7 lg:p-10">
                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.32em] text-stone-200/72">Current release</p>
                            <div className="space-y-1">
                                <h2
                                    id="current-collection-heading"
                                    className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl"
                                >
                                    Current Collection
                                </h2>
                                <p className="font-[family-name:var(--font-serif)] text-6xl leading-none text-stone-100 sm:text-7xl">
                                    FW 26
                                </p>
                            </div>
                            <p
                                id="current-collection-description"
                                className="max-w-sm text-sm leading-6 text-stone-200/86 sm:text-base"
                            >
                                Scroll or swipe through the featured frame studies from this season&rsquo;s obsidian
                                series.
                            </p>
                            <p id="current-collection-instructions" className="sr-only">
                                Use the numbered controls to preview each current collection image.
                            </p>
                            <p id="current-collection-status" aria-live="polite" className="sr-only">
                                Currently showing slide {activeCollectionIndex + 1} of {currentCollectionSlides.length}:{' '}
                                {activeSlide.imageAlt}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 sm:justify-between lg:flex-col lg:items-start">
                            <div className="flex gap-3" aria-hidden="true">
                                <span className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-100/70">
                                    Swipe
                                </span>
                                <span className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-100/70">
                                    Scroll
                                </span>
                            </div>
                            <ol className="flex gap-3 lg:flex-col" aria-label="Current collection image selector">
                            {currentCollectionSlides.map((collection, index) => {
                                const isActive = index === activeCollectionIndex

                                return (
                                    <li key={collection.id}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveCollectionIndex(index)}
                                            className={`flex h-14 w-10 items-center justify-center rounded-full text-sm tracking-[0.18em] transition-all duration-500 ease-out ${
                                                isActive
                                                    ? 'bg-stone-100 text-zinc-900 shadow-[0_12px_35px_rgba(255,255,255,0.22)]'
                                                    : 'border border-white/30 bg-white/5 text-white hover:bg-white/12'
                                            }`}
                                            aria-label={`Show current collection image ${index + 1}`}
                                            aria-pressed={isActive}
                                        >
                                            {`0${index + 1}`}
                                        </button>
                                    </li>
                                )
                            })}
                            </ol>
                        </div>
                    </div>

                    <div
                        className="relative min-h-[20rem] overflow-hidden rounded-t-[1.5rem] lg:min-h-full lg:rounded-none"
                        aria-label="Current collection imagery"
                    >
                        {currentCollectionSlides.map((slide, index) => {
                            const isActive = index === activeCollectionIndex

                            return (
                                <img
                                    key={slide.id}
                                    src={slide.imageSrc}
                                    alt={slide.imageAlt}
                                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-800 ease-in-out ${
                                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                                    }`}
                                    style={{
                                        objectPosition: currentCollectionObjectPositions[index],
                                        transform: `scale(${currentCollectionScales[index]})`,
                                        transformOrigin: 'center',
                                    }}
                                />
                            )
                        })}
                        <div
                            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,11,8,0.08),rgba(17,11,8,0.44))]"
                            aria-hidden="true"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-6 bottom-6 rounded-full border border-white/18 bg-black/18 px-4 py-3 text-xs uppercase tracking-[0.28em] text-stone-100/86 backdrop-blur-sm"
                        >
                            Object studies 01-03
                        </div>
                    </div>
                </div>
            </article>

            <section aria-labelledby="previous-collections-heading" className="space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <h2
                        id="previous-collections-heading"
                        className="font-[family-name:var(--font-serif)] text-2xl text-[color:var(--text-primary)] sm:text-3xl"
                    >
                        Previous Collections
                    </h2>
                    <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">Archive</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4" aria-label="Previous collections list">
                    {previousCollections.map((collection) => (
                        <li
                            key={collection.id}
                            className="group relative h-32 overflow-hidden rounded-[1.5rem] border border-black/8 bg-stone-900 shadow-[0_18px_42px_rgba(32,24,21,0.14)] sm:h-36 lg:h-40"
                        >
                            <img
                                src={collection.imageSrc}
                                alt={collection.imageAlt}
                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                style={{ objectPosition: previousCollectionObjectPositionById[collection.id] }}
                            />
                            <div
                                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,9,7,0.06),rgba(14,9,7,0.58))]"
                                aria-hidden="true"
                            />
                            <div className="absolute inset-x-3 bottom-3 rounded-full border border-white/15 bg-white/14 px-4 py-2 text-center text-sm tracking-[0.18em] text-white backdrop-blur-sm">
                                {collection.label}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    )
}
