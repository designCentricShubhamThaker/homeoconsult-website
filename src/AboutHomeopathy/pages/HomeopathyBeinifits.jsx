import React from 'react';

export default function HomeopathyBenefits() {
  const benefits = [
    {
      image: "/b1.png",
      title: "Safe and Natural",
      description: "No side effects or contraindications; suitable for all ages, including infants.",
      position: "left"
    },
    {
      image: "/b2.png",
      title: "Curative and Preventive",
      description: "Addresses both acute symptoms and chronic tendencies, reducing relapses.",
      position: "left"
    },
    {
      image: "/b3.png",
      title: "Non-Invasive",
      description: "Offers alternatives to surgery for conditions like tonsillitis, warts, piles, and renal stones.",
      position: "left"
    },
    {
      image: "/b4.png",
      title: "Boosts Immunity",
      description: "Improves natural resistance and overall vitality.",
      position: "right"
    },
    {
      image: "/b5.png",
      title: "Pain Relief Without Risks",
      description: "Effective for headaches, neuralgia, joint pain, and other chronic discomforts.",
      position: "right"
    },
    {
      image: "/b6.png",
      title: "Child-Friendly",
      description: "Sweet, easy-to-take medicines that children enjoy — helping prevent frequent infections and allergies.",
      position: "right"
    }
  ];

  const leftBenefits = benefits.filter(b => b.position === "left");
  const rightBenefits = benefits.filter(b => b.position === "right");

  return (
    <div className=" bg-gray-100 py-10 sm:py-12 lg:py-16 px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center">
      <div className="w-full">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12">
          <span className="text-[#207755] font-bold">Benefits of</span>{" "}
          <span className="text-[#207755] font-normal">Homeopathy</span>
        </h1>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-8 items-center">
          {/* Left Benefits */}
          <div className="col-span-4 space-y-5 xl:space-y-6">
            {leftBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>

          {/* Center Image */}
          <div className="col-span-4 flex justify-center items-center">
            <div className="w-full">
              <img
                src="/benefits_homeo.png"
                alt="Homeopathy"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Benefits */}
          <div className="col-span-4 space-y-5 xl:space-y-6">
            {rightBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-6 sm:space-y-8">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
              <img
                src="/benefits_homeo.png"
                alt="Homeopathy"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ image, title, description }) {
  return (
    <div className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center gap-2 sm:gap-3 lg:gap-4">
        {/* Icon with circle background */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 flex items-center justify-center">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain" 
          />
        </div>
        
        {/* Title */}
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-[#207755]">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}