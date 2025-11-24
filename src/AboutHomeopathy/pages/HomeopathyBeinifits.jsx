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
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex items-center">
      <div className=" mx-auto w-full">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="text-green-700">Benefits of</span>{" "}
          <span className="text-green-600">Homeopathy</span>
        </h1>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-center">
          {/* Left Benefits */}
          <div className="col-span-4 space-y-4">
            {leftBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>

          {/* Center Image */}
          <div className="col-span-4 flex justify-center items-center">
            <div className="w-150 h-150">
              <img
                src="/benefits_homeo.png"
                alt="Homeopathy"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Benefits */}
          <div className="col-span-4 space-y-4">
            {rightBenefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>

 
        <div className="lg:hidden space-y-6">
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48">
              <img
                src="/benefits_homeo.png"
                alt="Homeopathy"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      <div className="flex flex-col items-center text-center gap-2">
        {/* Icon with circle background */}
        <div >
          <img src={image} alt={title} className="w-35 h-30" />
        </div>
        
  
        <h3 className="text-base font-bold text-green-700">
          {title}
        </h3>
        
        <p className="text-xs text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}