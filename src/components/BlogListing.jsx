import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Eye, Clock, ArrowRight, Wifi, WifiOff } from 'lucide-react';

export default function BlogListing() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);


  const API_URL = 'https://lorinda-remotest-kase.ngrok-free.dev/blogs';
  const WS_URL = 'wss://lorinda-remotest-kase.ngrok-free.dev/blogs/ws';
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;
  const POLLING_INTERVAL = 5000;

  // Fetch initial blogs
  useEffect(() => {
    console.log('🚀 Component mounted, fetching blogs...');
    fetchBlogs();
  }, []);

  // Setup WebSocket connection
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const connectWebSocket = () => {
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log('⚠️ Max reconnection attempts reached, using polling only');
      setConnectionStatus('polling');
      fallbackToPolling();
      return;
    }

    try {
      console.log(`🔌 WebSocket connection attempt ${reconnectAttemptsRef.current + 1}/${MAX_RECONNECT_ATTEMPTS}...`);
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('✅ WebSocket Connected');
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0;

        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
          console.log('🛑 Stopped polling - WebSocket active');
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 WebSocket message:', data);

          if (['update', 'create', 'delete', 'connected'].includes(data.type)) {
            console.log(`🔄 Refreshing blogs due to: ${data.type}`);
            fetchBlogs();
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setConnectionStatus('error');
      };

      ws.onclose = (event) => {
        console.log(`🔌 WebSocket disconnected: Code ${event.code}`);
        setConnectionStatus('disconnected');

        wsRef.current = null;
        reconnectAttemptsRef.current++;

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`🔄 Attempting to reconnect...`);
            connectWebSocket();
          }, RECONNECT_DELAY);
        } else {
          setConnectionStatus('polling');
        }

        fallbackToPolling();
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('❌ Failed to create WebSocket:', error);
      setConnectionStatus('error');
      reconnectAttemptsRef.current++;
      fallbackToPolling();
    }
  };

  const fallbackToPolling = () => {
    if (!pollingIntervalRef.current) {
      console.log('📡 Starting polling fallback...');
      setConnectionStatus('polling');

      pollingIntervalRef.current = setInterval(() => {
        fetchBlogs();
      }, POLLING_INTERVAL);
    }
  };

  const fetchBlogs = async () => {
    try {
      console.log('🔄 Fetching blogs from:', API_URL);
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Blogs received:', data?.length);

      if (!Array.isArray(data)) {
        console.error('❌ Data is not an array:', data);
        setError('Invalid data format received');
        setLoading(false);
        return;
      }

      setBlogs(data.slice(0, 3)); // Show only latest 3 blogs
      setError(null);
      setLoading(false);
      console.log(`✅ Blogs set: ${data.length} blogs`);

      if (connectionStatus === 'error' && !wsRef.current) {
        setConnectionStatus('polling');
      }
    } catch (err) {
      console.error('❌ Error fetching blogs:', err);
      setError(err.message);
      setLoading(false);

      if (connectionStatus !== 'connected' && connectionStatus !== 'polling') {
        setConnectionStatus('error');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (description) => {
    const wordsPerMinute = 200;
    const words = description.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };


  if (loading) {
    return (
      <div className=" bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            <span className="text-[#207755]">Latest</span>{' '}
            <span className="text-[#207755] font-normal">Blogs</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold mb-2">Error loading blogs</p>
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={fetchBlogs}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
            <span className="text-[#207755]">Latest</span>{' '}
            <span className="text-[#207755] font-normal">Blogs</span>
          </h1>

          {/* Connection Status Badge */}

        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Blog Image */}
                <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                  {blog.image ? (
                    <img
                      src={`data:image/jpeg;base64,${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('Image load error for:', blog.title);
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-green-100 to-green-50">
                      <span className="text-green-600 text-4xl font-bold">
                        {blog.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-6 flex flex-col grow">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-green-600 transition-colors cursor-pointer">
                    {blog.title}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 grow">
                    {blog.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs sm:text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={14} className="text-green-600" />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-gray-500">
                        <Eye size={14} className="text-green-600" />
                        <span>0</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <Clock size={14} />
                      <span>{calculateReadTime(blog.description)} Min Read</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {blogs.length > 0 && (
          <div className="flex justify-end mt-8">
            <button className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group">
              <span>View All</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}