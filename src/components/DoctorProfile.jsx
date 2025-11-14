import React from 'react';

export default function DoctorProfile() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-7 md:p-8  overflow-hidden">
      <div className="mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-12 ">
          <div className="flex-shrink-0 mx-auto md:mx-0 px-16">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/dr_anish.png"
                alt="Dr. Anish Vaknalli"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-gray-500 text-sm md:text-base mb-2 tracking-wide uppercase">
              About Doctor
            </p>

            <h1 className="text-3xl md:text-2xl font-bold text-[#147140] mb-2 md:mb-3">
              Dr. Anish Vaknalli
            </h1>

            <p className="text-lg md:text-xl text-gray-700 font-medium mb-6 md:mb-8">
              MD, HomeoConsult R&D
            </p>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-4">
              Your decision to consider alternative treatment can certainly cause apprehension. Your condition
              has already created uncertainties and you must now be sure of the physician you are seeking
              and verify whether he has the required credentials – experience – knowledge and confidence to
              help you and/or guide you in the right direction.
            </p>

            <button className="bg-[#147140] hover:bg-teal-800 text-white font-semibold py-2 px-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-1 text-sm w-fit">
              Know More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
