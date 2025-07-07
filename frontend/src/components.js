import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock data for videos
const mockVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Traditional Buddha Meditation - Ancient Wisdom',
    channel: 'Spiritual Journey',
    views: '2.1M views',
    duration: '15:30',
    thumbnail: 'https://images.pexels.com/photos/19880838/pexels-photo-19880838.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    uploadTime: '2 days ago',
    category: 'Travel'
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'YouTube Dark Mode Interface Tour 2025',
    channel: 'Tech Reviews',
    views: '890K views',
    duration: '12:45',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    uploadTime: '1 week ago',
    category: 'Technology'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Epic Gaming Setup with VR Headset Review',
    channel: 'Gaming Central',
    views: '1.5M views',
    duration: '18:22',
    thumbnail: 'https://images.pexels.com/photos/7773547/pexels-photo-7773547.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    uploadTime: '3 days ago',
    category: 'Gaming'
  },
  {
    id: 'L_jWHffIx5E',
    title: 'Kids Learn Programming - Fun Coding Games',
    channel: 'Code Kids',
    views: '672K views',
    duration: '25:10',
    thumbnail: 'https://images.pexels.com/photos/4842492/pexels-photo-4842492.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    uploadTime: '5 days ago',
    category: 'Education'
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'PlayStation Controller Setup Guide',
    channel: 'Gaming Pro',
    views: '2.3M views',
    duration: '10:15',
    thumbnail: 'https://images.unsplash.com/photo-1611829713792-e1841cbe2cf8',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    uploadTime: '1 day ago',
    category: 'Gaming'
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Arduino Electronics Tutorial - Build Amazing Projects',
    channel: 'DIY Electronics',
    views: '1.2M views',
    duration: '32:45',
    thumbnail: 'https://images.pexels.com/photos/32894960/pexels-photo-32894960.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    uploadTime: '4 days ago',
    category: 'Technology'
  },
  {
    id: 'QH2-TGUlwu4',
    title: 'Professional Video Recording Setup - Ring Light Tutorial',
    channel: 'Content Creator Hub',
    views: '455K views',
    duration: '14:20',
    thumbnail: 'https://images.pexels.com/photos/6954220/pexels-photo-6954220.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    uploadTime: '1 week ago',
    category: 'Technology'
  },
  {
    id: 'nfWlot6h_JM',
    title: 'Fun Cooking with Kids - Easy Recipes',
    channel: 'Family Kitchen',
    views: '3.1M views',
    duration: '22:35',
    thumbnail: 'https://images.pexels.com/photos/5593717/pexels-photo-5593717.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    uploadTime: '2 weeks ago',
    category: 'Cooking'
  },
  {
    id: 'OADuOdGOzgQ',
    title: 'Family Cooking Time - Bonding Over Food',
    channel: 'Happy Family',
    views: '1.8M views',
    duration: '19:45',
    thumbnail: 'https://images.pexels.com/photos/5593652/pexels-photo-5593652.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    uploadTime: '3 weeks ago',
    category: 'Lifestyle'
  },
  {
    id: 'SQoA_wjmE9w',
    title: 'Professional Cooking Techniques - Steam Cooking',
    channel: 'Chef Masterclass',
    views: '2.7M views',
    duration: '28:10',
    thumbnail: 'https://images.unsplash.com/photo-1565882916152-4e9c2cba84e9',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    uploadTime: '1 month ago',
    category: 'Cooking'
  },
  {
    id: 'YykjpeuMNEk',
    title: 'Music Video Production Behind the Scenes',
    channel: 'Music Production',
    views: '1.9M views',
    duration: '16:55',
    thumbnail: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    uploadTime: '2 weeks ago',
    category: 'Music'
  },
  {
    id: 'ZbZSe6N_BXs',
    title: 'Beach Concert - Live Music Performance',
    channel: 'Live Music',
    views: '4.2M views',
    duration: '45:30',
    thumbnail: 'https://images.pexels.com/photos/3045391/pexels-photo-3045391.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    uploadTime: '1 month ago',
    category: 'Music'
  },
  {
    id: 'hFZFjoX2cGg',
    title: 'Live Concert Performance - Amazing Stage Show',
    channel: 'Concert Hall',
    views: '5.6M views',
    duration: '52:20',
    thumbnail: 'https://images.unsplash.com/photo-1490971512195-3385e8e72ab4',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    uploadTime: '2 months ago',
    category: 'Music'
  },
  {
    id: 'oHg5SJYRHA0',
    title: 'City Travel Vlog - Exploring with Friends',
    channel: 'Travel Buddies',
    views: '1.3M views',
    duration: '23:45',
    thumbnail: 'https://images.pexels.com/photos/13929242/pexels-photo-13929242.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    uploadTime: '1 week ago',
    category: 'Travel'
  },
  {
    id: 'RBumgq5yVrA',
    title: 'Travel Filmmaking - Cinematic Shots with Gimbal',
    channel: 'Travel Cinematography',
    views: '987K views',
    duration: '31:15',
    thumbnail: 'https://images.pexels.com/photos/12499815/pexels-photo-12499815.jpeg',
    channelAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    uploadTime: '3 weeks ago',
    category: 'Travel'
  },
  {
    id: 'cRdxXPV9GNQ',
    title: 'Scenic Coastal Adventure - Travel Photography',
    channel: 'Adventure Seeker',
    views: '2.4M views',
    duration: '27:40',
    thumbnail: 'https://images.unsplash.com/photo-1489395131208-596c1ecb2a39',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    uploadTime: '1 month ago',
    category: 'Travel'
  }
];

const categories = ['All', 'Gaming', 'Music', 'Technology', 'Cooking', 'Travel', 'Education', 'Lifestyle'];

// Header Component
export const Header = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a2.975 2.975 0 0 0-2.098-2.098C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.588A2.975 2.975 0 0 0 .502 6.186C0 8.086 0 12 0 12s0 3.914.502 5.814a2.975 2.975 0 0 0 2.098 2.098c1.9.588 9.4.588 9.4.588s7.5 0 9.4-.588a2.975 2.975 0 0 0 2.098-2.098C24 15.914 24 12 24 12s0-3.914-.502-5.814zM9.75 15.568V8.432L15.5 12l-5.75 3.568z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">YouTube</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-0 top-0 h-full px-6 bg-gray-100 dark:bg-gray-700 rounded-r-full border-l border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {darkMode ? (
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5h-5m-6 0L9 7l5 5-5 5H4" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5h-5m-6 0L9 7l5 5-5 5H4" />
          </svg>
        </button>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">U</span>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ sidebarOpen, darkMode }) => {
  const navigate = useNavigate();

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto`}>
      <div className="p-4 space-y-2">
        <div 
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          onClick={() => navigate('/')}
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14H8V5z" />
          </svg>
          {sidebarOpen && <span className="text-gray-900 dark:text-white">Home</span>}
        </div>
        
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {sidebarOpen && <span className="text-gray-900 dark:text-white">Trending</span>}
        </div>
        
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          {sidebarOpen && <span className="text-gray-900 dark:text-white">Music</span>}
        </div>
        
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {sidebarOpen && <span className="text-gray-900 dark:text-white">Gaming</span>}
        </div>
        
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          {sidebarOpen && <span className="text-gray-900 dark:text-white">News</span>}
        </div>
        
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a1 1 0 001 1h4M9 10V9a1 1 0 011-1h4a1 1 0 011 1v1M9 10H8a1 1 0 00-1 1v3a1 1 0 001 1h1m10-4h1a1 1 0 011 1v3a1 1 0 01-1 1h-1m-6 0V9" />
          </svg>
          {sidebarOpen && <span className="text-gray-900 dark:text-white">Sports</span>}
        </div>
        
        {sidebarOpen && (
          <>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 px-2">LIBRARY</h3>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 dark:text-white">History</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a1 1 0 001 1h4M9 10V9a1 1 0 011-1h4a1 1 0 011 1v1M9 10H8a1 1 0 00-1 1v3a1 1 0 001 1h1m10-4h1a1 1 0 011 1v3a1 1 0 01-1 1h-1m-6 0V9" />
                </svg>
                <span className="text-gray-900 dark:text-white">Your videos</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-900 dark:text-white">Watch later</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-gray-900 dark:text-white">Liked videos</span>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

// Video Card Component
const VideoCard = ({ video, darkMode }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="cursor-pointer group"
      onClick={() => navigate(`/watch/${video.id}`)}
    >
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-48 object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
      </div>
      <div className="mt-3 flex space-x-3">
        <img 
          src={video.channelAvatar} 
          alt={video.channel}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{video.channel}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {video.views} • {video.uploadTime}
          </p>
        </div>
      </div>
    </div>
  );
};

// Video Grid Component
export const VideoGrid = ({ searchTerm, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Category Filter */}
      <div className="flex space-x-3 mb-6 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category 
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ darkMode }) => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      text: 'Great video! Really enjoyed the content.',
      likes: 142,
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      text: 'This is exactly what I was looking for. Thanks for sharing!',
      likes: 89,
      time: '4 hours ago'
    },
    {
      id: 3,
      author: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      text: 'Amazing quality and very informative. Keep up the great work!',
      likes: 67,
      time: '1 day ago'
    }
  ]);

  const currentVideo = mockVideos.find(v => v.id === videoId);
  const relatedVideos = mockVideos.filter(v => v.id !== videoId).slice(0, 8);

  if (!currentVideo) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Video not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={currentVideo.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {currentVideo.title}
          </h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img 
                src={currentVideo.channelAvatar} 
                alt={currentVideo.channel}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{currentVideo.channel}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">1.2M subscribers</p>
              </div>
              <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full">
                <button className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-full transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">12K</span>
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-full transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                </button>
              </div>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-semibold">{currentVideo.views}</span>
              <span>{currentVideo.uploadTime}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              This is a great video about {currentVideo.title.toLowerCase()}. Learn more about this topic and discover amazing content.
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Comments ({comments.length})
          </h3>
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <img 
                  src={comment.avatar} 
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{comment.author}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span className="text-sm">{comment.likes}</span>
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>
                    </button>
                    <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Related Videos */}
      <div className="w-full lg:w-96">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Up next</h3>
        <div className="space-y-3">
          {relatedVideos.map(video => (
            <div 
              key={video.id}
              className="flex space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
              onClick={() => navigate(`/watch/${video.id}`)}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-40 h-24 object-cover rounded-lg"
                />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm">
                  {video.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{video.channel}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {video.views} • {video.uploadTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};