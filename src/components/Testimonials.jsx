import React, { useState, useEffect, useRef } from 'react';
import { User, Stethoscope } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/testimonials';
const WS_URL = 'ws://localhost:8000/testimonials/ws';

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
      const response = await fetch(API_BASE_URL);
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
      setCurrentTestimonialIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex >= currentDisease.testimonials.length) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentDiseaseIndex((prevDiseaseIndex) => 
              (prevDiseaseIndex + 1) % diseaseGroups.length
            );
            setIsTransitioning(false);
          }, 500);
          return 0;
        }
        
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, [diseaseGroups, currentDiseaseIndex]);

  useEffect(() => {
    setCurrentTestimonialIndex(0);
  }, [currentDiseaseIndex]);

  if (diseaseGroups.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-green-700 text-xl font-semibold">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  const currentDisease = diseaseGroups[currentDiseaseIndex];
  const visibleTestimonials = currentDisease.testimonials.slice(0, Math.min(2, currentTestimonialIndex + 1));

  return (
    <div className=" relative " style={{
      backgroundImage: 'url(/green_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Header */}
      <div className="py-12 px-8 relative z-10">
        <h1 className="text-5xl font-bold text-center text-white drop-shadow-lg">
          Eight Decades of <span className="font-light">Proven Care</span>
        </h1>
      </div>

      <div className={`max-w-7xl mx-auto px-8 pb-16 relative z-10 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Before/After Image */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
              {currentDisease.image ? (
                <div className="space-y-6">
                  {/* Single Before/After Image */}
                  <div className="relative">
                    <img
                      src={`data:image/jpeg;base64,${currentDisease.image}`}
                      alt={currentDisease.disease_name}
                      className="w-full h-auto rounded-2xl shadow-lg"
                    />
                    {/* Disease Name Overlay at Bottom */}
                    <div className="absolute bottom-4 left-4 bg-green-700/90 text-white px-4 py-2 rounded-lg">
                      <h2 className="text-lg font-bold">{currentDisease.disease_name}</h2>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-center h-80 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl">
                    <div className="text-center">
                      <div className="text-7xl mb-4">🏥</div>
                      <h2 className="text-3xl font-bold text-gray-800">{currentDisease.disease_name}</h2>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* View All link - bottom left */}
            <div className="mt-6 flex items-center justify-between">
              <button className="flex items-center gap-2 text-white hover:text-green-900 transition-colors drop-shadow">
                <span className="text-sm font-medium">View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Pagination dots */}
              <div className="flex gap-2">
                {diseaseGroups.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentDiseaseIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentDiseaseIndex 
                        ? 'bg-white w-8' 
                        : 'bg-white/60 hover:bg-white/80 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Testimonial Cards */}
          <div className="space-y-6">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transition-all duration-700 ${
                  idx === visibleTestimonials.length - 1 ? 'scale-100 opacity-100' : 'scale-98 opacity-90'
                }`}
                style={{
                  animation: idx === visibleTestimonials.length - 1 ? 'slideInRight 0.7s ease-out' : 'none'
                }}
              >
                <div className="mb-6">
                  <div className="text-5xl text-green-300 font-serif leading-none mb-3">"</div>
                  <p className="text-gray-700 text-base leading-relaxed italic">
                    {testimonial.brief}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        - {testimonial.patient_name}
                      </h3>
                      <p className="text-sm text-gray-600 italic">
                        {testimonial.branch}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Show placeholder for second card if only one testimonial visible */}
            {visibleTestimonials.length === 1 && currentDisease.testimonials.length > 1 && (
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 h-64 flex items-center justify-center opacity-40">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-sm">Next testimonial loading...</p>
                </div>
              </div>
            )}

            {/* View All and Pagination */}
            <div className="flex items-center justify-between pt-4">
              {/* Pagination dots for testimonials */}
              <div className="flex gap-2">
                {currentDisease.testimonials.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentTestimonialIndex 
                        ? 'bg-green-700 w-8' 
                        : 'bg-green-300 w-2'
                    }`}
                  />
                ))}
              </div>

              {/* View All link - bottom right */}
              <button className="flex items-center gap-2 text-white hover:text-green-900 transition-colors drop-shadow">
                <span className="text-sm font-medium">View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}