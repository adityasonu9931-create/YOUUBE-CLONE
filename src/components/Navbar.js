import React, { useState, useCallback, memo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { changeSearchTerm, clearVideos } from "../features/youtube/youtubeSlice";

const Navbar = memo(({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = useCallback(() => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos);
      dispatch(getSearchPageVideos(false));
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname, navigate, dispatch]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
        {/* Left Section */}
        <div className="flex gap-4 sm:gap-8 items-center text-xl sm:text-2xl">
          <button 
            onClick={onMenuClick || toggleMobileMenu}
            className="lg:hidden p-1 hover:bg-gray-700 rounded"
          >
            <GiHamburgerMenu />
          </button>
          <div className="flex gap-1 items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
            <BsYoutube className="text-2xl sm:text-3xl text-red-600" />
            <span className="text-lg sm:text-2xl font-medium">Youtube</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}>
            <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-3xl border border-transparent focus-within:border-blue-500 transition-colors">
              <div className="flex gap-5 items-center pr-5 flex-1">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-zinc-900 focus:outline-none border-none text-sm"
                  value={searchTerm}
                  onChange={e => dispatch(changeSearchTerm(e.target.value))}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button 
                type="submit"
                className="h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl hover:bg-zinc-700 transition-colors"
              >
                <AiOutlineSearch className="text-lg" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center gap-2 sm:gap-5">
          {/* Mobile Search Button */}
          <button 
            className="sm:hidden p-2 hover:bg-gray-700 rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <AiOutlineSearch className="text-xl" />
          </button>

          {/* Desktop Icons */}
          <div className="hidden sm:flex gap-5 items-center text-xl">
            <button className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
              <FaMicrophone />
            </button>
            <button className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
              <RiVideoAddLine />
            </button>
            <div className="relative">
              <button className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
                <BsBell />
              </button>
              <span className="absolute -top-1 -right-1 text-xs bg-red-600 rounded-full px-1.5 py-0.5">
                9+
              </span>
            </div>
            <img
              src="https://yt3.googleusercontent.com/Ad8Q8PblBvMbfVEEpuSiAvcLoI6XqEecc4GEjCN41716Zc1lLEjR6lPB4JXjKzMLVFYskARDaNU=s900-c-k-c0x00ffffff-no-rj"
              alt="profile logo"
              className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-[#212121] p-4">
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-700 rounded-full"
              >
                <IoClose className="text-2xl" />
              </button>
              <span className="text-lg font-medium">Search</span>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}>
              <div className="flex bg-zinc-900 items-center h-12 px-4 pr-0 rounded-3xl border border-transparent focus-within:border-blue-500 transition-colors">
                <div className="flex gap-5 items-center pr-5 flex-1">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-zinc-900 focus:outline-none border-none text-base"
                    value={searchTerm}
                    onChange={e => dispatch(changeSearchTerm(e.target.value))}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                </div>
                <button 
                  type="submit"
                  className="h-12 w-16 flex items-center justify-center bg-zinc-800 rounded-r-3xl hover:bg-zinc-700 transition-colors"
                >
                  <AiOutlineSearch className="text-xl" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
