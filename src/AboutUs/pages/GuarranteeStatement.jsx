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

      <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-8 z-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center lg:items-start">
          
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

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-3 sm:space-y-4"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 mb-1">
                HomeoConsult R&D's
              </h2>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-700">
                Guarantee Statement
              </h3>
            </div>

            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              HomeoConsult R&D provides a Service Guarantee for its online treatment plans, 
              focusing on resolving patient confusion about alternative therapies and ensuring 
              high-quality care.
            </p>

            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-green-800">
                Why They Guarantee Their Service:
              </h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                Experienced Panel Doctors: They have a cumulative experience of over 50 years 
                and have treated 60,000+ individuals. The panel (including Dr. Anish Vaknalli & Dr. 
                Vaknalli's son) has training from India, the UK, and the USA.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-sm sm:text-base font-bold text-green-800">
                Personal Attention:
              </h5>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                Unlike corporate chains, every patient receives personal attention and every prescription 
                is personally recommended by the Dr. Vaknalli panel.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-sm sm:text-base font-bold text-green-800">
                Expertise:
              </h5>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                They offer a researched, side-effect-free, and customized homeopathic treatment. 
                They only accept cases they believe can be treated effectively within the scope of homeopathy.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-sm sm:text-base font-bold text-green-800">
                Customer Support:
              </h5>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                They provide high-level, ongoing support via email or call, including free callback requests.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-green-800">
                The Core Guarantee:
              </h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
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