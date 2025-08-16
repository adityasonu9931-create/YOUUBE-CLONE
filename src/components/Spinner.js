import React, { memo } from 'react'

const Spinner = memo(() => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
    </div>
  )
});

Spinner.displayName = 'Spinner';

export default Spinner;

// Skeleton loading component for cards
export const CardSkeleton = memo(() => {
  return (
    <div className='w-full sm:w-64 h-auto sm:h-60 flex gap-3 flex-col animate-fade-in'>
      <div className='relative'>
        <div className="w-full h-32 sm:h-44 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
      <div className='flex gap-2 flex-1'>
        <div className='min-w-fit'>
          <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse"></div>
        </div>
        <div className='flex-1 min-w-0 space-y-2'>
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  )
});

CardSkeleton.displayName = 'CardSkeleton';

// Skeleton grid for loading multiple cards
export const CardGridSkeleton = memo(({ count = 12 }) => {
  return (
    <div className='grid gap-y-8 gap-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 sm:p-8'>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
});

CardGridSkeleton.displayName = 'CardGridSkeleton';
