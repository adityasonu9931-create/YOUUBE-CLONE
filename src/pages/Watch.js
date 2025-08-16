import React, { useEffect, useState, useCallback, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Spinner from "../components/Spinner";

const Watch = memo(() => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );

  const recommendedVideo = useAppSelector(
    (state) => state.youtubeApp.recommendedVideo
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  if (!currentPlaying || currentPlaying?.videoId !== id) {
    return (
      <div className="min-h-screen bg-[#181818] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181818]">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Video Player Section */}
              <div className="flex-1">
                <div className="relative w-full">
                  <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe 
                      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                      frameBorder="0"
                      className="w-full h-full"
                      allowFullScreen
                      title="Youtube Player"
                    />
                  </div>
                </div>
                
                {/* Video Info */}
                {currentPlaying && (
                  <div className="mt-4 space-y-4">
                    <h1 className="text-lg sm:text-xl font-semibold line-clamp-2">
                      {currentPlaying.videoTitle}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={currentPlaying.channelInfo?.image} 
                          alt="channel" 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">{currentPlaying.channelInfo?.name}</h3>
                          <p className="text-sm text-gray-400">{currentPlaying.videoViews} views</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Recommended Videos */}
              <div className="lg:w-80 space-y-4">
                <h3 className="text-lg font-semibold">Recommended</h3>
                <div className="space-y-4">
                  {recommendedVideo.length > 0 ? (
                    recommendedVideo.map((video) => (
                      <Card key={video.videoId} data={video} />
                    ))
                  ) : (
                    <div className="flex justify-center py-8">
                      <Spinner />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
});

Watch.displayName = 'Watch';

export default Watch;
