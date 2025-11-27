import React, { useState, useEffect, useRef } from 'react';

const API_BASE_URL = 'http://localhost:8000/testimonials';
const WS_URL = 'wss://lorinda-remotest-kase.ngrok-free.dev/testimonials/ws';

export default function TestimonialDisplay() {
  const [diseaseGroups, setDiseaseGroups] = useState([]);
  const [currentDiseaseIndex, setCurrentDiseaseIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    fetchTestimonials();
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message:', message);

      if (message.type === 'create' || message.type === 'update' || message.type === 'delete') {
        fetchTestimonials();
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected, reconnecting...');
      setTimeout(connectWebSocket, 3000);
    };
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",

        },
      });

      const data = await response.json() || [];

      const grouped = data.reduce((acc, testimonial) => {
        const disease = testimonial.disease_name;
        if (!acc[disease]) {
          acc[disease] = {
            disease_name: disease,
            image: testimonial.image,
            testimonials: []
          };
        }
        acc[disease].testimonials.push(testimonial);
        return acc;
      }, {});

      setDiseaseGroups(Object.values(grouped));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  useEffect(() => {
    if (diseaseGroups.length === 0) return;

    const currentDisease = diseaseGroups[currentDiseaseIndex];
    if (!currentDisease || currentDisease.testimonials.length === 0) return;

    const scrollInterval = setInterval(() => {
      const nextTestimonialIndex = currentTestimonialIndex + 2;

      if (nextTestimonialIndex >= currentDisease.testimonials.length) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentDiseaseIndex((prevDiseaseIndex) =>
            (prevDiseaseIndex + 1) % diseaseGroups.length
          );
          setCurrentTestimonialIndex(0);
          setIsTransitioning(false);
        }, 500);
      } else {
        setCurrentTestimonialIndex(nextTestimonialIndex);
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, [diseaseGroups, currentDiseaseIndex, currentTestimonialIndex]);

  if (diseaseGroups.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-200 via-green-100 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-green-700 text-xl font-semibold">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  const currentDisease = diseaseGroups[currentDiseaseIndex];
  const testimonial1 = currentDisease?.testimonials[currentTestimonialIndex];
  const testimonial2 = currentDisease?.testimonials[currentTestimonialIndex + 1];

  if (!testimonial1) {
    return (
      <div className=" bg-linear-to-br from-green-200 via-green-100 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-green-700 text-xl font-semibold">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  const totalPairs = Math.ceil(currentDisease.testimonials.length / 2);
  const currentPairIndex = Math.floor(currentTestimonialIndex / 2);
  const hasOnlyOne = !testimonial2;

return (
  <div className="relative flex flex-col overflow-hidden" style={{
    backgroundImage: 'url(/green_bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>

    <div className="py-3 sm:py-4 md:py-5 lg:py-6 px-3 sm:px-4 md:px-6 lg:px-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20 relative z-10 shrink-0">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-white drop-shadow-lg">
        Eight Decades of <span className="font-light">Proven Care</span>
      </h1>
    </div>

    <div className={`flex-1 flex items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 sm:py-4 md:py-5 lg:py-6 min-h-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-start">

          {/* Image Card */}
          <div className="flex flex-col h-[220px] sm:h-[250px] md:h-[280px] lg:h-[320px] xl:h-[360px]">
            <div className="bg-green-100 rounded-lg p-2.5 sm:p-3 md:p-4 flex flex-col h-full">
              {currentDisease.image ? (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="relative flex-1 min-h-0">
                    <img
                      src={`data:image/jpeg;base64,${currentDisease.image}`}
                      alt={currentDisease.disease_name}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-linear-to-br from-green-100 to-teal-100 rounded-lg sm:rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2">🏥</div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{currentDisease.disease_name}</h2>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
            {/* Testimonials Cards - Single column on mobile, grid on larger screens */}
            <div className="h-[220px] sm:h-[250px] md:h-[280px] lg:h-[320px] xl:h-[360px]">
              <div className={`grid grid-cols-1 md:grid-cols-${hasOnlyOne ? '1' : '2'} gap-2.5 sm:gap-3 md:gap-4 h-full`}>
                <div
                  key={`testimonial-${testimonial1.id}-${currentTestimonialIndex}`}
                  className="bg-white/85 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-3.5 md:p-4 flex flex-col transition-all duration-700 h-full"
                  style={{
                    animation: 'slideInRight 0.7s ease-out'
                  }}
                >
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="mb-2 flex-1 overflow-hidden">
                      <div className="text-2xl sm:text-3xl text-green-300 font-serif leading-none mb-1 sm:mb-1.5">"</div>
                      <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed italic line-clamp-6 sm:line-clamp-7 md:line-clamp-8">
                        {testimonial1.brief}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-2.5 border-t border-gray-200 mt-auto shrink-0">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5 truncate">
                        - {testimonial1.patient_name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 italic truncate">
                        {testimonial1.branch}
                      </p>
                    </div>
                  </div>
                </div>

                {testimonial2 && (
                  <div
                    key={`testimonial-${testimonial2.id}-${currentTestimonialIndex}`}
                    className="bg-white/85 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-3.5 md:p-4 flex-col transition-all duration-700 h-full hidden md:flex"
                    style={{
                      animation: 'slideInRight 0.7s ease-out 0.1s'
                    }}
                  >
                    <div className="flex-1 flex flex-col justify-between overflow-hidden">
                      <div className="mb-2 flex-1 overflow-hidden">
                        <div className="text-2xl sm:text-3xl text-green-300 font-serif leading-none mb-1 sm:mb-1.5">"</div>
                        <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed italic line-clamp-6 sm:line-clamp-7 md:line-clamp-8">
                          {testimonial2.brief}
                        </p>
                      </div>

                      <div className="pt-2 sm:pt-2.5 border-t border-gray-200 mt-auto shrink-0">
                        <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5 truncate">
                          - {testimonial2.patient_name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-600 italic truncate">
                          {testimonial2.branch}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls - Dots centered, View All at end */}
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-center">
                <div className="flex gap-1 sm:gap-1.5">
                  {Array.from({ length: totalPairs }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonialIndex(idx * 2)}
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${idx === currentPairIndex
                        ? 'bg-green-700 w-5 sm:w-6'
                        : 'bg-green-300 hover:bg-green-400 w-1 sm:w-1.5'
                        }`}
                    />
                  ))}
                </div>
              </div>

              <button className="flex items-center gap-1 sm:gap-1.5 text-white hover:text-green-200 transition-colors drop-shadow text-xs sm:text-sm font-medium">
                <span>View All</span>
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @keyframes slideInRight {
        from {
          transform: translateX(30px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .line-clamp-6 {
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-7 {
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-8 {
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
  </div>
);
}