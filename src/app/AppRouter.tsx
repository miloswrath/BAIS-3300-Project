import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/home/HomePage'
import { PreviousCollectionPage } from '../pages/previousCollection/PreviousCollectionPage'

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/previous-collection" element={<PreviousCollectionPage />} />
        </Routes>
    )
}
