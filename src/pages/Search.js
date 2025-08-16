import React, { useEffect, useState, useCallback, memo } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useAppDispatch,useAppSelector} from "../hooks/useApp";
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import Spinner from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { clearVideos } from '../features/youtube/youtubeSlice';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';
import SearchCard from '../components/SearchCard';

const Search = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state)=> state.youtubeApp.videos);
  const searchTerm = useAppSelector((state)=> state.youtubeApp.searchTerm);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(()=>{
    dispatch(clearVideos());
    if(searchTerm==="")navigate("/");
    else(
        dispatch(getSearchPageVideos(false))
    )
  },[dispatch,navigate,searchTerm]);

  const handleLoadMore = useCallback(() => {
    dispatch(getSearchPageVideos(true));
  }, [dispatch]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className='min-h-screen bg-[#181818]'>
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className='flex'>
        <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main className='flex-1 lg:ml-0'>
          {videos.length ? (
            <div className='py-4 sm:py-8 pl-4 sm:pl-8 flex flex-col gap-5 w-full'>
              <InfiniteScroll 
                dataLength={videos.length} 
                next={handleLoadMore}
                hasMore={videos.length < 500}
                loader={<Spinner/>}
                className="overflow-hidden"
              >
                {videos.map((item) => (
                  <div className='my-3 sm:my-5' key={item.videoId}>
                    <SearchCard data={item} />
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          )}
        </main>
      </div>
    </div>
  )
});

Search.displayName = 'Search';

export default Search;
