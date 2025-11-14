import React from "react";
import { motion } from "framer-motion";

const WelcomeSection = () => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Individual item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth effect
      }
    }
  };

  // Scale fade variant for welcome text
  const welcomeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="relative w-full ">
      <img
        src="/bg1.jpg"
        alt="Welcome Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex items-start justify-center  px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full px-8 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            className="text-gray-400 text-8xl sm:text-6xl lg:text-7xl font-light  hurricane-regular"
             
            variants={welcomeVariants}
          >
            Welcome
          </motion.h1>
          
          <motion.h2
            className="text-[#147140]  text-xl sm:text-3xl lg:text-2xl  mb-4"
            variants={itemVariants}
          >
            Your Gateway to Great Health.
          </motion.h2>

          <motion.div
            className="text-gray-700 text-base sm:text-lg lg:text-md leading-relaxed space-y-6 text-left max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <p>
              We are the recognized leaders in Homeopathy, built on{" "}
              <span className="text-[#147140] font-bold">
                three generations and over 100 years of cumulative experience.
              </span>{" "}
              Our practice super-specializes in treating Chronic Ailments and Behavioral Disorders. With{" "}
              <span className="text-[#147140] font-bold">
                over 60,000 cases treated across five decades,
              </span>{" "}
              our clinically verified treatments reach{" "}
              <span className="text-[#147140] font-bold">
                satisfied patients in over 50 countries.
              </span>{" "}
              We are proud to administer the purest homeopathic medicines, including the{" "}
              <span className="text-[#147140] font-bold">
                unique Neuro-Pathways (NP) therapy invented by Dr. Anish Vaknalli for behavioral disorders using bio-neural and homeo remedies.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeSection;