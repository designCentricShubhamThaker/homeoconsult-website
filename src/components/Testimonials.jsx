import React, { useState, useEffect, useRef } from 'react';

const API_BASE_URL = 'https://lacey-flocculable-sherice.ngrok-free.dev/testimonials';
const WS_URL = 'wss://lacey-flocculable-sherice.ngrok-free.dev/testimonials/ws';

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
    <div className="min-h-screen relative flex flex-col overflow-hidden" style={{
      backgroundImage: 'url(/green_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

      <div className="py-3 px-4 mt-12 sm:mt-16 lg:mt-20 relative z-10 shrink-0">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-white drop-shadow-lg">
          Eight Decades of <span className="font-light">Proven Care</span>
        </h1>
      </div>

      <div className={`flex-1 flex items-center px-2 sm:px-4 py-4 min-h-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full max-w-full sm:max-w-[98%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 h-full items-stretch">

            {/* Image Card - Responsive Height */}
            <div className="flex flex-col h-[250px] sm:h-[300px] lg:h-[350px]">
              <div className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-2xl p-3 flex flex-col h-full">
                {currentDisease.image ? (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="relative flex-1 min-h-0">
                      <img
                        src={`data:image/jpeg;base64,${currentDisease.image}`}
                        alt={currentDisease.disease_name}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-linear-to-br from-green-100 to-teal-100 rounded-xl">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🏥</div>
                      <h2 className="text-2xl font-bold text-gray-800">{currentDisease.disease_name}</h2>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Testimonials Card - Auto Height on Mobile, Fixed on Desktop */}
            <div className="flex flex-col h-auto lg:h-[350px]">
              <div className={`grid ${hasOnlyOne ? 'grid-cols-1' : 'grid-cols-1'} ${!hasOnlyOne ? 'sm:grid-cols-2' : ''} gap-3 sm:gap-4 h-full`}>
                <div
                  key={`testimonial-${testimonial1.id}-${currentTestimonialIndex}`}
                  className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex flex-col transition-all duration-700 min-h-[280px] lg:h-full"
                  style={{
                    animation: 'slideInRight 0.7s ease-out'
                  }}
                >
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="mb-2 flex-1 overflow-hidden">
                      <div className="text-3xl text-green-300 font-serif leading-none mb-1.5">"</div>
                      <p className="text-gray-700 text-sm leading-relaxed italic line-clamp-8">
                        {testimonial1.brief}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gray-200 mt-auto shrink-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-0.5 truncate">
                        - {testimonial1.patient_name}
                      </h3>
                      <p className="text-xs text-gray-600 italic truncate">
                        {testimonial1.branch}
                      </p>
                    </div>
                  </div>
                </div>

                {testimonial2 && (
                  <div
                    key={`testimonial-${testimonial2.id}-${currentTestimonialIndex}`}
                    className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex flex-col transition-all duration-700 min-h-[280px] lg:h-full"
                    style={{
                      animation: 'slideInRight 0.7s ease-out 0.1s'
                    }}
                  >
                    <div className="flex-1 flex flex-col justify-between overflow-hidden">
                      <div className="mb-2 flex-1 overflow-hidden">
                        <div className="text-3xl text-green-300 font-serif leading-none mb-1.5">"</div>
                        <p className="text-gray-700 text-sm leading-relaxed italic line-clamp-8">
                          {testimonial2.brief}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-gray-200 mt-auto shrink-0">
                        <h3 className="font-bold text-gray-900 text-sm mb-0.5 truncate">
                          - {testimonial2.patient_name}
                        </h3>
                        <p className="text-xs text-gray-600 italic truncate">
                          {testimonial2.branch}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPairs }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonialIndex(idx * 2)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentPairIndex
                        ? 'bg-green-700 w-6'
                        : 'bg-green-300 hover:bg-green-400 w-1.5'
                        }`}
                    />
                  ))}
                </div>

                <button className="flex items-center gap-1.5 text-white hover:text-green-200 transition-colors drop-shadow text-sm font-medium">
                  <span>View All</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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