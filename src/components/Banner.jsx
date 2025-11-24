import React, { useState, useEffect } from 'react'


const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const slides = [
    {
      id: 1,
      image: '/banner1.jpg',
      title: 'Why Homeopathy',
      subtitle: 'Learn about our research proven treatment.',
      buttonText: 'Learn More',
    },
    {
      id: 2,
      image: '/banner2.jpg',
      title: 'NP-Therapy (Neuro Pathways Therapy)',
      subtitle: 'Treating Autism, ADHD, Developmental Delays & Motor Disorders',
      features: [
        'Reverses Signs of Autism & ADHD',
        'Boosts Maturity, Cognition & Intellect',
        'Rectifies Sensory-Neural Pathways',
      ],
    },
    {
      id: 3,
      image: '/banner3.jpg',
      title: 'Find Relief: Chronic Ailments, Autoimmune & Skin Solutions',
      features: [
        'High Success in chronic ailments.',
        'Reverses abnormal immune responses.',
        'Significantly Helps autoimmune ailments.',
      ],
    },
    {
      id: 4,
      image: '/banner4.jpg',
      title: 'Fighting Autism, Thane Boy scores 91.2% SSC Board Exams',
      subtitle: 'A True Story of Triumph & Healing',
      description: 'Homeopathic Treatment from Dr. Anish Vaknalli of HomeoConsult R&D. Improving Focus, Memory & Reducing Anxiety.',
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
    <div className="relative w-full overflow-hidden bg-gray-900">

      <div className="hidden md:block">
        <div className="relative h-[70vh] lg:h-[80vh] w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                  ? 'opacity-100'
                  : 'opacity-0'
                }`}
            >
              <div className="grid grid-cols-2 h-full">
                {/* Left Side - Content with ailments_banner background */}
                <div
                  className="relative h-full bg-cover bg-center flex items-center justify-start px-8 lg:px-4"
                  style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
                >
                  <div className="text-white text-left  p-6">
                    <h2 className="text-4xl lg:text-4xl mb-4 font-bold leading-tight">
                      {slide.title}
                    </h2>

                    {slide.subtitle && (
                      <p className="text-xl lg:text-2xl mb-4 ">
                        {slide.subtitle}
                      </p>
                    )}

                    {slide.features && (
                      <div className="mb-4 space-y-2">
                        <p className="text-lg font-semibold mb-3">Key Benefits:</p>
                        {slide.features.map((feature, idx) => (
                          <p key={idx} className="text-base lg:text-lg flex items-start">
                            <span className="mr-2">-</span>
                            <span>{feature}</span>
                          </p>
                        ))}
                      </div>
                    )}

                    {slide.description && (
                      <p className="text-base lg:text-lg mb-4 leading-relaxed">
                        {slide.description}
                      </p>
                    )}

                    {slide.buttonText && (
                      <button className="bg-[#1b824b] hover:bg-teal-600 active:bg-teal-800 text-white text-sm lg:text-base font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-lg border border-teal-600 hover:shadow-xl hover:scale-105 mt-4">
                        {slide.buttonText}
                      </button>
                    )}

                  </div>
                </div>

                <div className="relative h-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="relative w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ease-in-out ${index === currentSlide
                  ? 'opacity-100 block'
                  : 'opacity-0 hidden'
                }`}
            >
              {/* Image First */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Below with ailments_banner background */}
              <div
                className="px-6 py-10 text-center bg-cover bg-center"
                style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
              >
                <h2 className="text-2xl sm:text-3xl mb-4 text-white font-bold leading-tight">
                  {slide.title}
                </h2>

                {slide.subtitle && (
                  <p className="text-lg sm:text-xl mb-3 font-semibold text-white">
                    {slide.subtitle}
                  </p>
                )}

                {slide.features && (
                  <div className="mb-4 text-left max-w-md mx-auto">
                    <p className="text-base font-semibold mb-3 text-white">Key Benefits:</p>
                    {slide.features.map((feature, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-white/95 mb-2 flex items-start">
                        <span className="mr-2">-</span>
                        <span>{feature}</span>
                      </p>
                    ))}
                  </div>
                )}

                {slide.description && (
                  <p className="text-sm sm:text-base mb-4 text-white/95 leading-relaxed">
                    {slide.description}
                  </p>
                )}

                {slide.buttonText && (
                  <button className="bg-[#1b824b] hover:bg-teal-600 active:bg-teal-800 text-white text-sm font-medium px-6 py-2.5 rounded-md transition-all duration-300 shadow-lg border border-teal-600 hover:shadow-xl mt-4">
                    {slide.buttonText}
                  </button>
                )}

               
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
                ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner