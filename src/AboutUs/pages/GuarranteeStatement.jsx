import React from 'react';
import { motion } from 'framer-motion';

const GuaranteeStatement = () => {
  return (
    <div className="relative w-full bg-gray-100 overflow-hidden">
      <div className="relative  mx-auto px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative flex justify-center items-center"
          >

            <div className="absolute top-0 left-0 w-32 h-24 opacity-90">
              <img 
                src="/flower2.png" 
                alt="Lavender decoration" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="relative z-10 w-full max-w-md">
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
            className="flex-1 space-y-4"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-1">
                HomeoConsult R&D's
              </h2>
              <h3 className="text-2xl lg:text-3xl font-semibold text-green-700">
                Guarantee Statement
              </h3>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              HomeoConsult R&D provides a service guarantee for its online treatment plans, 
              ensuring an interactive, patient-centered consultation about alternative therapies and ensuring 
              positive patient outcomes.
            </p>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-green-800">
                Why They Guarantee Their Service:
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                HomeoConsult R&D has cultivated trust through their genuine care for over 50 years, 
                and have treated 60,000+ individuals. The panel (including Dr Anish Vaknalli) & Dr. 
                Vaknalli's son (who) has training from India, the UK, and the USA.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-base font-bold text-green-800">
                Personal Attention:
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                Unlike corporate chains, every patient receives personalized and every prescription 
                is personally recommended by the Dr. Vaknalli himself.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-base font-bold text-green-800">
                Expertise:
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                They offer a researched, side-effect-free, and customized homeopathic treatment. 
                They only accept cases they believe can be treated effectively within the scope of homeopathy.
              </p>
            </div>

            <div className="space-y-1">
              <h5 className="text-base font-bold text-green-800">
                Customer Support:
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                They provide high-quality ongoing support via email or call, including free callback requests.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-green-800">
                The Core Guarantee:
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                They guarantee full satisfaction with the quality of service, medicines and support. 
                They promise a customized prescription, the highest quality medicines, and round-the-clock 
                patient care. If, after four months, patients remain unhappy, the consultants refund them 
                the consultancy fee and homeopathy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeStatement;