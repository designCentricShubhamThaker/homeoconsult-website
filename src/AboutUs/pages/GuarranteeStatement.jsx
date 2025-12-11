import React from 'react';
import { motion } from 'framer-motion';

const GuaranteeStatement = () => {
  return (
    <div className="relative w-full bg-gray-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-24 sm:w-32 md:w-40 lg:w-88 h-auto opacity-90 z-0">
        <img
          src="/flower2.png"
          alt="Lavender decoration"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 z-10">
        {/* Header Section - Centered */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center  sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-bold text-[#147140] mb-2">
            HomeoConsult R&D's <span className='font-normal'> Guarantee Statement</span>
          </h2>

          <p className="text-gray-700 text-xs sm:text-base lg:text-sk leading-relaxed max-w-4xl mx-auto px-4">
            HomeoConsult R&D provides a Service Guarantee for its online treatment plans,
            focusing on resolving patient confusion about alternative therapies and ensuring
            high-quality care.
          </p>
        </motion.div>

        {/* Content Section - Image + Text */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center lg:items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center items-center"
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <img
                src="/100percent.png"
                alt="100% Satisfaction Guarantee"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-1 sm:space-y-5"
          >
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#207755]">
                Why They Guarantee Their Service:
              </h4>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Experienced Panel Doctors: They have a cumulative experience of over 50 years
                and have treated 60,000+ individuals. The panel (including Dr. Anish Vaknalli & Dr.
                Vaknalli's son) has training from India, the UK, and the USA.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-sm sm:text-base lg:text-lg font-bold text-[#207755]">
                Personal Attention:
              </h5>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Unlike corporate chains, every patient receives personal attention and every prescription
                is personally recommended by the Dr. Vaknalli panel.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-sm sm:text-base lg:text-lg font-bold text-[#207755]">
                Expertise:
              </h5>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                They offer a researched, side-effect-free, and customized homeopathic treatment.
                They only accept cases they believe can be treated effectively within the scope of homeopathy.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-sm sm:text-base lg:text-lg font-bold text-[#207755]">
                Customer Support:
              </h5>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                They provide high-level, ongoing support via email or call, including free callback requests.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#207755]">
                The Core Guarantee:
              </h4>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                They guarantee full satisfaction with the quality of service, medicines, and support.
                They promise a customized prescription, the highest quality medicines, and personal attention.
                Guaranteeing, they will work to solve your concerns within the constraints of medicine and homeopathy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeStatement;