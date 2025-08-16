import React, { memo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

const SearchCard = memo(({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className='flex flex-col sm:flex-row gap-3 p-2 hover:bg-gray-800 rounded-lg transition-colors'>
      <div className='relative flex-shrink-0'>
        <span className='absolute bottom-3 right-3 text-xs sm:text-sm bg-gray-900 px-2 py-0.5 z-10 rounded'>
          {data.videoDuration}
        </span>

        <Link to={`/watch/${data.videoId}`}>
          <div className="relative w-full sm:w-72 h-32 sm:h-44 bg-gray-800 rounded-lg overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 skeleton animate-pulse"></div>
            )}
            {imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-400">
                <span className="text-xs">Image unavailable</span>
              </div>
            ) : (
              <img 
                src={data.videoThumbnail} 
                alt='Thumbnail'
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
        </Link>
      </div>
      
      <div className='flex-1 min-w-0 space-y-2'>
        <h3 className='text-sm sm:text-base font-medium'>
          <Link 
            to={`/watch/${data.videoId}`}
            className='line-clamp-2 hover:text-blue-400 transition-colors'
          >
            {data.videoTitle}
          </Link>
        </h3>
        
        <div className='text-xs sm:text-sm text-gray-400'>
          <div className="flex items-center gap-1">
            <span>{data.videoViews} views</span>
            <span className="text-gray-500">•</span>
            <span>{data.videoAge}</span>
          </div>
        </div>
        
        <div className='flex items-center gap-2'>
          <div className="relative w-6 h-6 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
            <img 
              src={data.channelInfo.image}
              alt='channel'
              className='w-full h-full object-cover'
              loading="lazy"
            />
          </div>
          <span className='text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer'>
            {data.channelInfo.name}
          </span>
        </div>
        
        <div className='text-xs sm:text-sm text-gray-400'>
          <p className='line-clamp-2 sm:line-clamp-3'>
            {data.videoDescription}
          </p>
        </div>
      </div>
    </div>
  )
});

SearchCard.displayName = 'SearchCard';

export default SearchCard;
