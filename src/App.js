import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Spinner from './components/Spinner'

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const Watch = lazy(() => import('./pages/Watch'))

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#181818] flex items-center justify-center">
    <Spinner />
  </div>
)

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/watch/:id' element={<Watch />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
