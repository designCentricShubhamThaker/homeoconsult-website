import React from 'react';
import { useNavigate } from "react-router-dom";

export default function DoctorProfile() {
   const navigate = useNavigate();
  return (
    <div className="bg-linear-to-br from-gray-100 to-gray-200 p-4 md:p-8 overflow-hidden">
      <div className="mx-auto  overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-12">
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/dr_anish.png"
                alt="Dr. Anish Vaknalli"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center px-2 md:px-0">
            <p className="text-gray-500 text-xs md:text-sm mb-2 tracking-wide uppercase">
              About Doctor
            </p>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#147140] mb-2 md:mb-3">
              Dr. Anish Vaknalli
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-700 font-medium mb-4 md:mb-6">
              MD, HomeoConsult R&D
            </p>

            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-5 md:mb-6">
              Your decision to consider alternative treatment can certainly cause apprehension. Your condition
              has already created uncertainties and you must now be sure of the physician you are seeking
              and verify whether he has the required credentials – experience – knowledge and confidence to
              help you and/or guide you in the right direction.
            </p>

               <button
      onClick={() => navigate("/about-us")}
      className="bg-[#147140] hover:bg-teal-800 text-white font-semibold py-2.5 px-5 md:py-3 md:px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base w-fit"
    >
      Know More
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

          </div>
        </div>
      </div>
    </div>
  );
}