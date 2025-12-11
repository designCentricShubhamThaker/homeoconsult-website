import React, { useState, useEffect, useRef } from 'react';

const DiseaseCarousel = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const autoScrollIntervalRef = useRef(null);

  // Configuration
  const API_URL = 'http://localhost:8000/disease-cards';
  const WS_URL = 'ws://localhost:8000/disease-cards/ws';
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;
  const POLLING_INTERVAL = 5000;
  const CARDS_PER_PAGE = 4;
  const AUTO_SCROLL_INTERVAL = 4000;
  
  // Cache Configuration
  const CACHE_KEY = 'disease_cards_cache';
  const CACHE_TIMESTAMP_KEY = 'disease_cards_cache_timestamp';
  const CACHE_DURATION = 30 * 60 * 1000;

  // Fetch initial cards
  useEffect(() => {
    console.log('🚀 Component mounted, fetching cards...');
    fetchCards();
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
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  // START AUTO-SCROLL when cards are loaded
  useEffect(() => {
    console.log('🎬 Cards changed, length:', cards.length);
    
    // Clear any existing interval
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }

    // Start auto-scroll if we have cards
    if (cards.length > 0) {
      console.log('✅ Starting AUTO-SCROLL with', cards.length, 'cards');
      
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % cards.length;
          console.log('🔄 AUTO-SCROLL: Moving from', prev, 'to', next);
          return next;
        });
      }, AUTO_SCROLL_INTERVAL);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        console.log('🛑 Cleaning up auto-scroll');
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };
  }, [cards.length]);

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
        console.log('✅ WebSocket Connected - Disease Cards');
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
          console.log('📨 WebSocket message - Disease Cards:', data);

          if (['update', 'create', 'delete', 'connected'].includes(data.type)) {
            console.log(`🔄 Refreshing cards due to: ${data.type}`);
            fetchCards(true);
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error - Disease Cards:', error);
        setConnectionStatus('error');
      };

      ws.onclose = (event) => {
        console.log(`🔌 WebSocket disconnected - Disease Cards: Code ${event.code}`);
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
      console.error('❌ Failed to create WebSocket - Disease Cards:', error);
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
        fetchCards();
      }, POLLING_INTERVAL);
    }
  };

  const fetchCards = async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedData && cacheTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp);

          if (cacheAge < CACHE_DURATION) {
            const parsedData = JSON.parse(cachedData);
            console.log('📦 Loaded disease cards from cache (age:', Math.round(cacheAge / 60000), 'minutes)');
            setCards(parsedData);
            
            if (connectionStatus === 'error' && !wsRef.current) {
              setConnectionStatus('polling');
            }
            return;
          }
        }
      }

      console.log('🔄 Fetching fresh disease cards from:', API_URL);
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
      console.log('📦 Raw data received:', data);

      if (!Array.isArray(data)) {
        console.error('❌ Data is not an array:', data);
        return;
      }

      const sortedData = data.sort((a, b) => a.position - b.position);

      localStorage.setItem(CACHE_KEY, JSON.stringify(sortedData));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      console.log('💾 Cached fresh disease card data');

      setCards(sortedData);
      console.log(`✅ Cards set: ${sortedData.length} cards`);

      if (connectionStatus === 'error' && !wsRef.current) {
        setConnectionStatus('polling');
      }
    } catch (error) {
      console.error('❌ Error fetching disease cards:', error);

      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        console.log('📦 Using stale cache as fallback');
        const parsedData = JSON.parse(cachedData);
        setCards(parsedData);
      }

      if (connectionStatus !== 'connected' && connectionStatus !== 'polling') {
        setConnectionStatus('error');
      }
    }
  };

  const getImageSrc = (imageData) => {
    if (!imageData) return null;
    return `data:image/jpeg;base64,${imageData}`;
  };

  const getDisplayCards = () => {
    if (cards.length === 0) return [];
    
    const displayCards = [];
    for (let i = 0; i < CARDS_PER_PAGE; i++) {
      const index = (currentIndex + i) % cards.length;
      displayCards.push({
        ...cards[index],
        displayIndex: i
      });
    }
    
    return displayCards;
  };

  if (cards.length === 0) {
    return (
      <div className="w-full py-12 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#147140] mb-3">
            Effective Homeopathic Solutions
          </h2>
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
            <p>Loading diseases...</p>
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-500">Connection: {connectionStatus}</p>
          </div>
        </div>
      </div>
    );
  }

  const displayCards = getDisplayCards();

  return (
    <div
      className="py-8 sm:py-12 md:py-16 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-[#147140] font-bold">
            Effective Homeopathic <span className="font-normal">Solutions</span>
          </h2>
        </div>

        <div className="relative w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
            {displayCards.map((card) => {
              const delay = card.displayIndex * 100;
              
              return (
                <div
                  key={`${card.id}-${currentIndex}-${card.displayIndex}`}
                  className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 w-full"
                  style={{
                    animation: `smoothSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms both`,
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <div className="bg-[#147140] p-3 sm:p-4 text-white">
                    <h3 className="text-base sm:text-lg font-bold text-center mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-emerald-100 text-center line-clamp-2">
                      {card.description}
                    </p>
                  </div>

                  <div className="relative h-36 sm:h-40 md:h-44 lg:h-48 bg-[#147140]">
                    {card.image ? (
                      <img
                        src={getImageSrc(card.image)}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Image load error for:', card.title);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-emerald-300 text-3xl sm:text-4xl md:text-5xl">🏥</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto-scroll indicator */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="flex gap-1.5">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-500 rounded-full ${
                  currentIndex === index 
                    ? 'bg-[#147140] w-8 h-2.5' 
                    : 'bg-emerald-300 w-2.5 h-2.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes smoothSlideIn {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          60% {
            opacity: 1;
            transform: translateX(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default DiseaseCarousel;