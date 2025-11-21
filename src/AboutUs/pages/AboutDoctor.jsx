import React from 'react';
import { Linkedin } from 'lucide-react';

export default function AboutDoctor() {
  return (
    <div className="  p-4 md:p-8 flex items-center justify-center">
    
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10">
          {/* Left Side - Image */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            <div className="w-48 h-48 md:w-56 md:h-56">
              {/* Replace this div with your actual image */}
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                <img src='/dr_anish2.png' alt="Dr. Anish Vaknalli"
                  className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>

          </div>

          {/* Right Side - Content */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 mb-1">
                  Dr. Anish V. Vaknalli
                </h1>
                <p className="text-base md:text-lg text-gray-700">
                  (MD - HomeoConsult R&D)
                </p>
              </div>
              <a
                href="#"
                className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              A third-generation homeopath, Dr. Vaknalli brings over two decades of international experience and research expertise. He has trained and worked at reputed institutions in the USA, including UCSD Hospital and the Children's Hospital, San Diego.
            </p>

            {/* Credentials Section */}
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg md:text-xl font-bold text-teal-800 mb-4">
                Credentials & Leadership:
              </h2>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 whitespace-nowrap">Director –</span>
                  <span className="text-gray-700">NHP India Pharmaceuticals</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 whitespace-nowrap">Director –</span>
                  <span className="text-gray-700">HomeoHelpline Services</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 whitespace-nowrap">Head Research Coordinator –</span>
                  <span className="text-gray-700">NHP India</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 whitespace-nowrap">Member –</span>
                  <span className="text-gray-700">Royal Society of Health, London & CCH (India)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
   
    </div>
  );
}