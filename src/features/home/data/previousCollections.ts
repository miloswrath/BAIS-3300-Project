import currentCollection1Image from '../../../assets/images/Current-Collection-1.jpg'
import fw25Image from '../../../assets/images/FW-25.jpg'
import ss24Image from '../../../assets/images/SS-24.jpg'
import ss25Image from '../../../assets/images/SS-25.jpg'

export type CollectionCard = {
    id: string
    label: string
    imageSrc: string
    imageAlt: string
}

export const previousCollections: CollectionCard[] = [
    {
        id: 'ss25',
        label: 'SS25',
        imageSrc: ss25Image,
        imageAlt: 'SS25 obsidian artifact styled on a shelf in an interior scene.',
    },
    {
        id: 'fw25',
        label: 'FW25',
        imageSrc: fw25Image,
        imageAlt: 'FW25 obsidian pendant displayed on a dark coat.',
    },
    {
        id: 'ss24',
        label: 'SS24',
        imageSrc: ss24Image,
        imageAlt: 'SS24 obsidian pieces arranged on stone texture.',
    },
]

export const currentCollectionSlides: CollectionCard[] = [
    {
        id: 'current-collection-1',
        label: '01',
        imageSrc: currentCollection1Image,
        imageAlt: 'Featured obsidian artifact displayed on pedestal for the current collection.',
    },
    {
        id: 'ss25-highlight',
        label: '02',
        imageSrc: ss25Image,
        imageAlt: 'SS25 obsidian artifact styled on a shelf in an interior scene.',
    },
    {
        id: 'fw25-highlight',
        label: '03',
        imageSrc: fw25Image,
        imageAlt: 'FW25 obsidian pendant displayed on a dark coat.',
    },
]
