import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Wifi, WifiOff } from 'lucide-react';

const DiseaseCarousel = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const autoScrollTimerRef = useRef(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const containerRef = useRef(null);

  // Configuration
  const API_URL = 'https://lorinda-remotest-kase.ngrok-free.dev/disease-cards';
  const WS_URL = 'wss://lorinda-remotest-kase.ngrok-free.dev/disease-cards/ws';
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;
  const POLLING_INTERVAL = 5000;

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

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
    };
  }, []);

  // Enable auto-scroll after animation
  useEffect(() => {
    if (isVisible && cards.length > 0 && !hasAnimated) {
      setHasAnimated(true);

      const timer = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, cards.length, hasAnimated]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && cards.length > 4) {
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(cards.length / 4));
      }, 5000);
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, cards.length]);

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
            console.log(`🔄 Refreshing cards due to: ${data.type}`);
            fetchCards();
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
        fetchCards();
      }, POLLING_INTERVAL);
    }
  };

  const fetchCards = async () => {
    try {
      console.log('🔄 Fetching cards from:', API_URL);
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
      console.log('📦 Is array:', Array.isArray(data), 'Length:', data?.length);

      if (!Array.isArray(data)) {
        console.error('❌ Data is not an array:', data);
        return;
      }

      const sortedData = data.sort((a, b) => a.position - b.position);

      setCards(sortedData);
      console.log(`✅ Cards set: ${sortedData.length} cards`);

      if (connectionStatus === 'error' && !wsRef.current) {
        setConnectionStatus('polling');
      }
    } catch (error) {
      console.error('❌ Error fetching cards:', error);

      if (connectionStatus !== 'connected' && connectionStatus !== 'polling') {
        setConnectionStatus('error');
      }
    }
  };

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(cards.length / 4)) % Math.ceil(cards.length / 4));
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(cards.length / 4));
  };

  const goToSlide = (index) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
  };

  const getImageSrc = (imageData) => {
    if (!imageData) return null;
    return `data:image/jpeg;base64,${imageData}`;
  };

  const getDisplayCards = () => {
    const startIdx = currentIndex * 4;
    const displayCards = cards.slice(startIdx, startIdx + 4);
    console.log(`📋 Displaying cards ${startIdx} to ${startIdx + 4}, count: ${displayCards.length}`);
    return displayCards;
  };

  const totalPages = Math.ceil(cards.length / 4);

  if (cards.length === 0) {
    return (
      <div className="w-full py-12 bg-linear-to-br from-emerald-50 to-teal-50">
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
            <p className="text-xs text-gray-400 mt-2">Check console for detailed logs</p>
          </div>
        </div>
      </div>
    );
  }

  const displayCards = getDisplayCards();

  return (
  <div
    ref={containerRef}
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
          {displayCards.map((card, index) => {
            const delay = index * 150;
            const isFromLeft = index % 2 === 0;
            return (
              <div
                key={`${card.id}-${currentIndex}-${index}`}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 w-full"
                style={{
                  animation: isVisible && hasAnimated ? 'none' : `slideIn${isFromLeft ? 'Left' : 'Right'} 0.6s ease-out ${delay}ms both`,
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
    </div>

    <style>{`
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-100px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
    `}</style>
  </div>
);
};

export default DiseaseCarousel;