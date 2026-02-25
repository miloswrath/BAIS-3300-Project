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
        <section aria-labelledby="hero-title" className="space-y-6">
            <div>
                <h1 id="hero-title" className="font-serif text-4xl">
                    Obsidian Artifact Co.
                </h1>
                <p className="mt-3 max-w-prose text-base text-zinc-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                </p>
            </div>

            <article
                aria-labelledby="current-collection-heading"
                className="relative h-[331px] overflow-hidden rounded-xl text-white shadow-md touch-none"
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
                {currentCollectionSlides.map((slide, index) => {
                    const isActive = index === activeCollectionIndex

                    return (
                        <img
                            key={slide.id}
                            src={slide.imageSrc}
                            alt={slide.imageAlt}
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-800 ease-in-out ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                                }`}
                            style={{
                                objectPosition: currentCollectionObjectPositions[index],
                                transform: `scale(${currentCollectionScales[index]})`,
                                transformOrigin: 'center',
                            }}
                        />
                    )
                })}
                <div className="absolute inset-0 bg-zinc-950/55" aria-hidden="true" />
                <div className="relative flex h-full justify-between p-4">
                    <div>
                        <h2 id="current-collection-heading" className="font-serif text-lg">
                            Current Collection
                        </h2>
                        <p className="font-serif text-4xl">FW 26</p>
                    </div>

                    <ol className="mt-10 flex flex-col gap-2" aria-label="Current collection image selector">
                        {currentCollectionSlides.map((collection, index) => {
                            const isActive = index === activeCollectionIndex

                            return (
                                <li key={collection.id}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveCollectionIndex(index)}
                                        className={`h-12 w-8 rounded-full text-base transition-all duration-500 ease-out ${isActive
                                            ? 'scale-105 bg-white text-zinc-900 shadow'
                                            : 'border border-white bg-transparent text-white hover:bg-white/10'
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
            </article>

            <section aria-labelledby="previous-collections-heading" className="space-y-3">
                <h2 id="previous-collections-heading" className="font-serif text-2xl text-zinc-900">
                    Previous Collections
                </h2>
                <ul className="grid grid-cols-3 gap-3" aria-label="Previous collections list">
                    {previousCollections.map((collection) => (
                        <li key={collection.id} className="relative h-24 overflow-hidden rounded-lg shadow">
                            <img
                                src={collection.imageSrc}
                                alt={collection.imageAlt}
                                className="absolute inset-0 h-full w-full object-cover"
                                style={{ objectPosition: previousCollectionObjectPositionById[collection.id] }}
                            />
                            <div className="absolute inset-x-2 bottom-2 rounded-full bg-zinc-200/45 py-0.5 text-center text-sm text-white backdrop-blur-sm">
                                {collection.label}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    )
}
