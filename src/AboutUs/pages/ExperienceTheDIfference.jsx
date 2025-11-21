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
      <div className="w-full bg-white py-8 md:py-10 lg:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4">
              <span className="text-green-700">Experience</span>
              <span className="text-gray-800"> the Difference</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed px-4">
              Backed by seven decades of research, clinical experience, and personalized care — we combine tradition, innovation, and compassion to deliver proven, long-term results.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Green Background */}
      <div className="w-full bg-[#147140] py-8 md:py-10 lg:py-12">
        <div className="mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-8 md:mb-10 lg:mb-12"
          >
            Why Choose <span className="font-normal">HomeoConsult R&D?</span>
          </motion.h3>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Circular Image with Border */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-4">
                  <div className="w-full h-full rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-white text-sm md:text-base lg:text-lg font-bold mb-2">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-white text-xs md:text-sm leading-snug opacity-90">
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