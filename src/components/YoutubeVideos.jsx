import React, { useState, useEffect } from 'react';
import { Play, Calendar, ExternalLink, Video, Clock } from 'lucide-react';

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID
 
  console.log('Using API Key:', API_KEY);
  console.log('Using Channel ID:', CHANNEL_ID);

  useEffect(() => {
    fetchVideos();
  }, []);

  const parseDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatDuration = (duration) => {
    const totalSeconds = parseDuration(duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

const fetchVideos = async (forceRefresh = false) => {
  const CACHE_KEY = `youtube_videos_${CHANNEL_ID}`;
  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  const MIN_DURATION_SECONDS = 180; // non-short = at least 3 mins

  try {
    setLoading(true);

    // 🔹 1. Check Cache
    if (!forceRefresh) {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

      if (cachedData && cacheTimestamp) {
        const now = Date.now();
        const cacheAge = now - parseInt(cacheTimestamp);

        if (cacheAge < CACHE_DURATION) {
          const parsedData = JSON.parse(cachedData);
          console.log(
            "Loaded videos from cache (age:",
            Math.round(cacheAge / 60000),
            "minutes)"
          );
          setVideos(parsedData.slice(0, 4));
          setError(null);
          setLoading(false);
          return;
        }
      }
    }

    console.log("Fetching fresh data from YouTube API...");

    // 🔹 2. First Fetch → Search (only gets IDs)
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video`
    );

    if (!searchResponse.ok) {
      throw new Error("Failed to fetch videos");
    }

    const searchData = await searchResponse.json();
    const videoIds = searchData.items
      .map((item) => item.id.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) throw new Error("No video IDs found");

    console.log("Found video IDs:", videoIds);

    // 🔹 3. Second Fetch → Video details (gets duration here!)
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails`
    );

    if (!detailsResponse.ok) {
      throw new Error("Failed to fetch video details");
    }

    const detailsData = await detailsResponse.json();

    // 🔹 4. Filter full-length videos (not shorts)
    const fullLengthVideos = detailsData.items.filter((video) => {
      const iso = video.contentDetails.duration; // e.g. "PT45S" or "PT3M12S"

      const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
      const minutes = parseInt(match?.[1] || 0);
      const seconds = parseInt(match?.[2] || 0);
      const totalSeconds = minutes * 60 + seconds;

      console.log(
        `Video: ${video.snippet.title} → ${totalSeconds}s (${iso})`
      );

      return totalSeconds >= MIN_DURATION_SECONDS;
    });

    console.log(
      `Filtered ${fullLengthVideos.length} full-length videos from ${detailsData.items.length} total`
    );

    // 🔹 5. Cache results
    localStorage.setItem(CACHE_KEY, JSON.stringify(fullLengthVideos));
    localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());

    console.log("Cached fresh data");

    setVideos(fullLengthVideos.slice(0, 4));
    setError(null);
  } catch (err) {
    console.error("Error fetching videos:", err);
    setError(err.message);

    // 🔹 Fallback to stale cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      console.log("Using stale cache as fallback");
      setVideos(JSON.parse(cachedData).slice(0, 4));
      setError(null);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <p className="text-[#207755] font-medium">Error loading videos</p>
              <p className="text-[#207755]text-sm mt-2">{error}</p>
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
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-[#207755]">
            From our experts <span className='font-normal'>for you</span>
          </h1>
          <p className="text-gray-600 text-lg mt-3 max-w-4xl mx-auto">
            Get valuable insights related to your health from our experts. Watch them share their knowledge
            and perspective in these informative videos, curated just for you.
          </p>
        </div>

        {/* Videos Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No full-length videos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => {
              const videoId = video.id;
              const { title, description, publishedAt } = video.snippet;
              const duration = video.contentDetails.duration;
              const thumbnailUrl = `https://i.ytimg.com/vi/${videoId.trim()}/0.jpg`;

              return (
                <div
                  key={videoId}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-video bg-gray-900">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <Video className="w-16 h-16 text-gray-600" />
                      </div>
                    )}
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(duration)}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <div className="bg-bg-[#207755] rounded-full p-4">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#207755] transition-colors">
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
                        className="flex items-center gap-1 text-[#207755] hover:text-[#207755] font-medium"
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