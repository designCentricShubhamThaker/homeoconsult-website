import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const slides = [
    {
      id: 1,
      image: '/banner1.jpg',
      hasContent: true,
      title: 'Why Homeopathy',
      subtitle: 'Learn about our research proven treatment.',
    },
    {
      id: 2,
      image: '/banner1.jpg',
      hasContent: false,
    },
    {
      id: 3,
      image: '/banner1.jpg',
      hasContent: false,
    },
    {
      id: 4,
      image: '/banner1.jpg',
      hasContent: false,
    },
  ]

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  

  const goToSlide = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [currentSlide])

  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(autoPlay)
  }, [])

  return (
    <div className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] w-full overflow-hidden bg-gray-900">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="h-full w-full object-cover"
            />
            
            {slide.hasContent && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            )}

            {slide.hasContent && index === currentSlide && (
              <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 lg:px-8">
                <div
                  className="px-5 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 max-w-md lg:max-w-xl shadow-2xl backdrop-blur-md border border-white/20 animate-fade-in"
                  style={{
                    borderRadius: '60px 0 60px 0',
                    background: 'rgba(32, 119, 85, 0.8)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    animation: 'slideInLeft 0.8s ease-out',
                  }}
                >
                  <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-3xl  mb-2 ">
                    {slide.title}
                  </h1>

                  <p className="text-white text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 opacity-95 font-light leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <button className="bg-teal-700 hover:bg-teal-600 active:bg-teal-800 text-white text-xs sm:text-sm font-medium px-5 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 shadow-lg border border-teal-600 hover:shadow-xl hover:scale-105">
                    Know More
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Banner