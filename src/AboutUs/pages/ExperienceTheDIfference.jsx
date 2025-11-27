import React from 'react';
import { motion } from 'framer-motion';

export default function ExperienceTheDifference() {
  const features = [
    {
      id: 1,
      image: '/why_homeo1.png',
      title: 'World-Class Guaranteed',
      description: 'They offer the premium World-class HomeoConsult R&D clinic, with standardized medicines. A key feature is that Dr. Aman Varanasi - a WEF for HomeoConsult R&D Seriously strands to sway popular faith. medicine\'s certainly has been shown as highly effective, safe, and dependable since the 1930\'s.'
    },
    {
      id: 2,
      image: '/why_homeo2.png',
      title: 'Research',
      description: 'Robust and Evolving Practice Their treatment is not done. A company with over 30 years of product knowledge and cured cases. While they cite a high success/patient retention rate at HomeoConsult R&D, they emphasize that they use their failures to improve and provide the best service to their patients, while also being honest about the scope.'
    },
    {
      id: 3,
      image: '/why_homeo3.png',
      title: 'Experienced and Learned Leadership',
      description: 'The practice is led by Dr. Aman Varanasi, a well-read homeopath who has also instilled a vast knowledge base. His global exposure ensures reliability. The practice has a significant history with over 60,000 cases (Documented) and countries visited (7-8 with expansion planned).'
    },
    {
      id: 4,
      image: '/why_homeo4.png',
      title: 'Global Reach and Accessibility',
      description: 'Their services are offered to over 150 patients from all walks of life and countries around the world (mentioning places like Austria, Syria, Honduras, and Norway).'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full flex flex-col">
      {/* Top Section - White Background */}
      <div className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center w-full"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl text-center mb-2 sm:mb-3 md:mb-4">
              <span className="text-[#207755] font-bold">Experience</span>
              <span className="text-[#207755] font-normal"> the Difference</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-2 sm:px-4 md:px-6">
              Backed by seven decades of research and clinical experience,
              we bring together tradition and innovation to offer personalized care,
              delivering compassionate treatment with proven, long-term results.
            </p>

          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Green Background */}
      <div className="w-full bg-[#147140] py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl text-white sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            Why Choose <span className="font-normal">HomeoConsult R&D?</span>
          </motion.h3>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 w-full"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="flex flex-col items-start text-left"
              >
                {/* Circular Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 mb-3 sm:mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-white text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed opacity-90">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}