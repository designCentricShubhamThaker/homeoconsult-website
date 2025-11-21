// import React, { useState, useEffect } from 'react';
// import { Play, Calendar, ExternalLink } from 'lucide-react';

// const YouTubeVideos = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Replace these with your environment variables
//   // In your actual project, use: process.env.REACT_APP_YOUTUBE_API_KEY
//   const API_KEY = 'AIzaSyAlhNiHg9GvY_vzM-FU2M9bcXavmINSVYI';
//   const CHANNEL_ID = 'UCS_jSHExpSe4W2lQtE9nSWQ';

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch videos');
//       }
//       console.log(response);

//       const data = await response.json();
//       setVideos(data.items || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   const truncateText = (text, maxLength) => {
//     if (text.length <= maxLength) return text;
//     return text.substr(0, maxLength) + '...';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
//               <p className="mt-4 text-gray-600 font-medium">Loading videos...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
//               <p className="text-red-600 font-medium">Error loading videos</p>
//               <p className="text-red-500 text-sm mt-2">{error}</p>
//               <button 
//                 onClick={fetchVideos}
//                 className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
//             Latest Videos
//           </h1>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Check out our recent content on website development, branding & digital marketing
//           </p>
//         </div>

//         {/* Videos Grid */}
//         {videos.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No videos found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {videos.map((video) => {
//               // Only render if it's a video (not a channel result)
//               if (video.id.kind !== 'youtube#video') return null;

//               const videoId = video.id.videoId;
//               const { title, description, thumbnails, publishedAt } = video.snippet;

//               return (
//                 <div 
//                   key={videoId}
//                   className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
//                 >
//                   {/* Thumbnail */}
//                   <div className="relative overflow-hidden aspect-video bg-gray-200">
//                     <img 
//                       src={thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url}
//                       alt={title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
//                       <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
//                         <div className="bg-red-600 rounded-full p-4">
//                           <Play className="w-8 h-8 text-white fill-white" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-4 flex-1 flex flex-col">
//                     <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
//                       {title}
//                     </h3>

//                     {description && (
//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
//                         {truncateText(description, 100)}
//                       </p>
//                     )}

//                     <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         <span>{formatDate(publishedAt)}</span>
//                       </div>
//                       <a
//                         href={`https://www.youtube.com/watch?v=${videoId}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
//                       >
//                         Watch
//                         <ExternalLink className="w-3 h-3" />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Footer CTA */}
//         <div className="mt-12 text-center">
//           <a
//             href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
//           >
//             <Play className="w-5 h-5" />
//             Visit Our Channel
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YouTubeVideos;




import React, { useState, useEffect } from 'react';
import { Play, Calendar, ExternalLink } from 'lucide-react';

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace these with your environment variables
  // In your actual project, use: process.env.REACT_APP_YOUTUBE_API_KEY
  const API_KEY = 'AIzaSyAlhNiHg9GvY_vzM-FU2M9bcXavmINSVYI';
  const CHANNEL_ID = 'UCS_jSHExpSe4W2lQtE9nSWQ';

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async (forceRefresh = false) => {
    const CACHE_KEY = `youtube_videos_${CHANNEL_ID}`;
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

    try {
      setLoading(true);

      // Check if we have cached data and it's still valid
      if (!forceRefresh) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cacheTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp);

          // Use cached data if it's less than 30 minutes old
          if (cacheAge < CACHE_DURATION) {
            const parsedData = JSON.parse(cachedData);
            setVideos(parsedData);
            setError(null);
            setLoading(false);
            console.log('Loaded videos from cache (age:', Math.round(cacheAge / 1000 / 60), 'minutes)');
            return;
          }
        }
      }

      // Fetch fresh data from API
      console.log('Fetching fresh data from YouTube API...');
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      const videoItems = data.items || [];

      // Cache the data
      localStorage.setItem(CACHE_KEY, JSON.stringify(videoItems));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      console.log('Cached fresh data');

      setVideos(videoItems);
      setError(null);
    } catch (err) {
      setError(err.message);

      // If fetch fails, try to use stale cache as fallback
      const cachedData = localStorage.getItem(`youtube_videos_${CHANNEL_ID}`);
      if (cachedData) {
        console.log('Using stale cache as fallback');
        setVideos(JSON.parse(cachedData));
        setError(null); // Clear error since we have fallback data
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading videos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <p className="text-red-600 font-medium">Error loading videos</p>
              <p className="text-red-500 text-sm mt-2">{error}</p>
              <button
                onClick={() => fetchVideos(true)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-[#207755]">
            Latest <span className='font-normal'>Videos</span>
          </h1>
          <p className="text-gray-600 text-lg mt-3 max-w-4xl mx-auto">
            Get valuabe insights relaed to your health from our experts.Watch then share their knowledge
            and persepctive in these informative videos,curated just for you.          </p>
        </div>

        {/* Videos Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No videos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => {
              if (video.id.kind !== "youtube#video") return null;

              const videoId = video.id.videoId;
              const { title, description, thumbnails, publishedAt } = video.snippet;

              return (
                <div
                  key={videoId}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-video bg-gray-200">
                    <img
                      src={thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <div className="bg-red-600 rounded-full p-4">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {title}
                    </h3>

                    {description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                        {truncateText(description, 100)}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(publishedAt)}</span>
                      </div>
                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                      >
                        Watch
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

};

export default YouTubeVideos;