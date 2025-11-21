import React from 'react';
import { motion } from 'framer-motion';

const AboutUsBanner = () => {
  return (
    <div className="relative w-full">
      {/* Desktop Version - Overlay text on image */}
      <div className="hidden md:block relative h-[80vh] overflow-hidden">
        <img
          src="abt_banner.jpg"
          alt="Medical professionals"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-xl lg:max-w-xl">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                About Us
              </h1>

              <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-4 leading-snug">
                Best Homeopathic Doctor in Mumbai
              </h2>

              <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
                Choosing the right homeopathic physician is essential for lasting healing and confidence in your treatment. At HomeoConsult R&D, our legacy spans three generations and over 80 years of clinical excellence, treating more than a million patients worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Image on top, text below with animation */}
      <div className="block md:hidden">
        {/* Image */}
        <div className="w-full h-[50vh] sm:h-[55vh] overflow-hidden">
          <img
            src="banner_mob.png"
            alt="Medical professionals"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Text Content */}
        <div className="bg-white px-4 py-8 sm:px-6 sm:py-10">
          <div className="max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-gray-900 text-3xl sm:text-4xl font-bold mb-3 leading-tight"
            >
              About Us
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-gray-800 text-lg sm:text-xl font-semibold mb-4 leading-snug"
            >
              Best Homeopathic Doctor in Mumbai
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-gray-700 text-sm sm:text-base leading-relaxed"
            >
              Choosing the right homeopathic physician is essential for lasting healing and confidence in your treatment. At HomeoConsult R&D, our legacy spans three generations and over 80 years of clinical excellence, treating more than a million patients worldwide.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBanner;