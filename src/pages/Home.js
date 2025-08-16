import React, { useEffect, useState, useCallback, memo } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useAppDispatch,useAppSelector} from "../hooks/useApp";
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import Spinner, { CardGridSkeleton } from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';

const Home = memo(() => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state)=> state.youtubeApp.videos);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(()=>{
    dispatch(getHomePageVideos(false));
  },[dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(getHomePageVideos(true));
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
            <InfiniteScroll 
              dataLength={videos.length} 
              next={handleLoadMore}
              hasMore={videos.length < 500}
              loader={<Spinner/>}
              className="overflow-hidden"
              scrollableTarget="scrollableDiv"
            >
              <div className='grid gap-y-8 gap-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 sm:p-6 lg:p-8'>
                {videos.map((item) => (
                  <Card data={item} key={item.videoId}/>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <CardGridSkeleton count={12} />
          )}
        </main>
      </div>
    </div>
  )
});

Home.displayName = 'Home';

export default Home;
