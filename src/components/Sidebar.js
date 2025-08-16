import React, { memo, useState, useCallback } from 'react'
import{
    MdHomeFilled,
    MdOutlineSlowMotionVideo,
    MdSubscriptions,
    MdOutlineVideoLibrary,
    MdHistory,
    MdOutlineWatchLater,
} from 'react-icons/md';

import {LuThumbsUp} from 'react-icons/lu';
import { IoClose } from "react-icons/io5";

const Sidebar = memo(({ isMobileOpen, onClose }) => {
    const [activeItem, setActiveItem] = useState('Home');

    const mainLinks = [
        {
            icon: <MdHomeFilled className='text-xl'/>,
            name: 'Home'
        },
        {
            icon:<MdOutlineSlowMotionVideo className='text-xl'/>,
            name:'Shorts'
        },
        {
            icon:<MdSubscriptions className='text-xl'/>,
            name:'Subscriptions'
        }
    ];

    const otherLinks = [
        {
            icon:<MdOutlineVideoLibrary className='text-xl'/>,
            name:'Library'
        },
        {
            icon:<MdHistory className='text-xl'/>,
            name:"History"
        },
        {
            icon:<MdOutlineWatchLater className='text-xl'/>,
            name :"Watch Later"
        },
        {
            icon:<LuThumbsUp className='text-xl'/>,
            name :"Liked Video"
        }
    ];

    const handleItemClick = useCallback((name) => {
        setActiveItem(name);
        if (onClose) onClose();
    }, [onClose]);

    const sidebarContent = (
        <>
            <ul className='flex flex-col border-b-2 border-gray-700'>
                {mainLinks.map(({icon, name}) => (
                    <li 
                        key={name} 
                        className={`pl-6 py-3 hover:bg-zinc-700 cursor-pointer transition-colors ${
                            activeItem === name ? "bg-zinc-600" : ""
                        } rounded-xl`}
                        onClick={() => handleItemClick(name)}
                    >
                        <div className='flex items-center gap-5'> 
                            {icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <ul className='flex flex-col border-b-2 border-gray-800'>
                {otherLinks.map(({icon, name}) => (
                    <li 
                        key={name} 
                        className='pl-6 py-3 hover:bg-zinc-600 cursor-pointer transition-colors rounded-xl'
                        onClick={() => handleItemClick(name)}
                    >
                        <div className='flex items-center gap-5'> 
                            {icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className='hidden lg:block w-64 bg-[#212121] pr-5 overflow-auto pb-8 sidebar'>
                {sidebarContent}
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
                    <div className="fixed left-0 top-0 h-full w-64 bg-[#212121] z-50 transform transition-transform duration-300 ease-in-out">
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <h2 className="text-lg font-medium">Menu</h2>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-gray-700 rounded-full"
                            >
                                <IoClose className="text-2xl" />
                            </button>
                        </div>
                        <div className="overflow-auto pb-8">
                            {sidebarContent}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
