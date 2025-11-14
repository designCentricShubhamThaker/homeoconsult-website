import React from 'react';

export default function Milestones() {
  const milestones = [
    {
      title: "Established in 1975",
      description: "Over 50 years of trusted medical consultancy",
      angle: 45
    },
    {
      title: "4 Clinical Centres",
      description: "across foremost serving chronic complains",
      angle: 135
    },
    {
      title: "50,000+ Cases",
      description: "consulted and treated worldwide",
      angle: 225
    },
    {
      title: "Research & Evidence-Based Practice",
      description: "Bringing rigorous clinical outcomes",
      angle: 315
    },
    {
      title: "Published Authors",
      description: "Featured in news and medical media",
      angle: 225
    },
    {
      title: "Pioneers in Homeopathic Formulations",
      description: "www.oliguides.com",
      angle: 270
    },
    {
      title: "Affiliated with Leading Medical & Pharma Bodies",
      description: "AMRM, CCM, IAMH, INDIA",
      angle: 315
    },
    {
      title: "Global Presence",
      description: "Associated across all over the world",
      angle: 45
    }
  ];

  return (
    <section className="relative w-full bg-[#207755] min-h-screen lg:min-h-[100px] overflow-hidden">
      {/* Mobile/Tablet View */}
      <div className="lg:hidden py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {milestones.slice(0, 4).map((item, idx) => (
              <div key={idx} className="text-white">
                <h3 className="text-sm sm:text-base font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-green-100">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Center Circle for Mobile */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-green-100">
              <h2 className="text-green-600 font-bold text-center text-2xl px-4">
                Milestones
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {milestones.slice(4, 8).map((item, idx) => (
              <div key={idx} className="text-white">
                <h3 className="text-sm sm:text-base font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-green-100">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View - Full Screen Circular Layout */}
      <div className="hidden lg:flex items-center justify-center min-h-screen relative">
        <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
          
          {/* SVG for circles and dots */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >
            {/* Outer dashed circle */}
            <circle 
              cx="500" 
              cy="400" 
              r="320" 
              fill="none" 
              stroke="white" 
              strokeWidth="2"
              strokeDasharray="12,8"
              opacity="0.6"
            />
            
            {/* Inner solid circle */}
            <circle 
              cx="500" 
              cy="400" 
              r="180" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
              opacity="0.8"
            />

            {/* 8 Dots positioned around outer ring */}
            {/* Top */}
            <circle cx="500" cy="80" r="10" fill="white" opacity="0.95" />
            {/* Top Right */}
            <circle cx="726" cy="174" r="10" fill="white" opacity="0.95" />
            {/* Right */}
            <circle cx="820" cy="400" r="10" fill="white" opacity="0.95" />
            {/* Bottom Right */}
            <circle cx="726" cy="626" r="10" fill="white" opacity="0.95" />
            {/* Bottom */}
            <circle cx="500" cy="720" r="10" fill="white" opacity="0.95" />
            {/* Bottom Left */}
            <circle cx="274" cy="626" r="10" fill="white" opacity="0.95" />
            {/* Left */}
            <circle cx="180" cy="400" r="10" fill="white" opacity="0.95" />
            {/* Top Left */}
            <circle cx="274" cy="174" r="10" fill="white" opacity="0.95" />
          </svg>

          {/* Center Circle */}
          <div className="absolute flex items-center justify-center z-10">
            <div className="w-52 h-52 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-green-100">
              <h2 className="text-green-600 font-bold text-center text-4xl px-4">
                Milestones
              </h2>
            </div>
          </div>

          {/* Milestone Items - Top to Bottom, Left to Right */}
          {/* Top */}
          <div className="absolute text-white text-center" style={{ top: '40px', left: '50%', transform: 'translateX(-50%)', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">Established in 1975</h3>
            <p className="text-sm text-green-100">Over 50 years of trusted medical consultancy</p>
          </div>

          {/* Top Right */}
          <div className="absolute text-white" style={{ top: '120px', right: '100px', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">4 Clinical Centres</h3>
            <p className="text-sm text-green-100">across foremost serving chronic complains</p>
          </div>

          {/* Right */}
          <div className="absolute text-white" style={{ top: '50%', right: '50px', transform: 'translateY(-50%)', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">Global Presence</h3>
            <p className="text-sm text-green-100">Associated across all over the world</p>
          </div>

          {/* Bottom Right */}
          <div className="absolute text-white" style={{ bottom: '120px', right: '100px', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">50,000+ Cases</h3>
            <p className="text-sm text-green-100">consulted and treated worldwide</p>
          </div>

          {/* Bottom */}
          <div className="absolute text-white text-center" style={{ bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">Research & Evidence-Based Practice</h3>
            <p className="text-sm text-green-100">Bringing rigorous clinical outcomes</p>
          </div>

          {/* Bottom Left */}
          <div className="absolute text-white text-right" style={{ bottom: '120px', left: '100px', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">Published Authors</h3>
            <p className="text-sm text-green-100">Featured in news and medical media</p>
          </div>

          {/* Left */}
          <div className="absolute text-white text-right" style={{ top: '50%', left: '50px', transform: 'translateY(-50%)', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">Pioneers in Homeopathic Formulations</h3>
            <p className="text-sm text-green-100">www.oliguides.com</p>
          </div>

          {/* Top Left */}
          <div className="absolute text-white text-left" style={{ top: '120px', left: '100px', width: '180px' }}>
            <h3 className="text-base font-bold mb-1">Affiliated with Leading Medical & Pharma Bodies</h3>
            <p className="text-sm text-green-100">AMRM, CCM, IAMH, INDIA</p>
          </div>
        </div>
      </div>
    </section>
  );
}