import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MilestonesTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const milestones = [
    {
      title: "Established in 1975",
      description: "Over 50 years of trusted medical consultancy.",
      position: "top"
    },
    {
      title: "4 Clinical Centres",
      description: "across Bombay serving diverse communities.",
      position: "bottom"
    },
    {
      title: "60,000+ Cases",
      description: "consulted and treated worldwide.",
      position: "top"
    },
    {
      title: "Global Presence",
      description: "Patients from all over the world.",
      position: "bottom"
    },
    {
      title: "Published Authors",
      description: "Numerous articles in news and medical media.",
      position: "top"
    },
    {
      title: "Pioneers in Homeopathic Formulations",
      description: "www.nhpindia.com",
      position: "bottom"
    },
    {
      title: "Research & Evidence-Based Practice",
      description: "ensuring scientific clinical outcomes.",
      position: "top"
    },
    {
      title: "Affiliated with Leading Medical & Pharma Bodies",
      description: "AMRSH, CCH, HAMM, HARP.",
      position: "bottom"
    }
  ];

  return (
  <div ref={ref} className="w-full">
    <div className="hidden md:block relative w-full h-screen bg-cover bg-center overflow-hidden" 
         style={{
           backgroundImage: `url('/milestones.jpg')`,
         }}>
      
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-4 md:top-6 lg:top-8 xl:top-10 left-0 right-0 text-center"
      >
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">Milestones</h1>
      </motion.div>

      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="relative w-full mx-auto">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="h-0.5 bg-white origin-left"
          />
          
          <div className="flex justify-between items-center absolute top-0 left-0 right-0 h-0">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + (index * 0.25),
                  ease: "easeOut"
                }}
                className="relative flex flex-col items-center" 
                style={{ width: `${100 / milestones.length}%` }}
              >
                {milestone.position === 'top' ? (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 1.2 + (index * 0.25),
                        ease: "easeOut"
                      }}
                      className="absolute text-center px-1.5 md:px-2 lg:px-2.5 xl:px-3"
                      style={{ 
                        width: 'clamp(120px, 11vw, 200px)',
                        bottom: 'clamp(55px, 8vh, 90px)',
                        marginLeft: index === 0 ? 'clamp(10px, 2vw, 30px)' : index === milestones.length - 1 ? 'clamp(-30px, -2vw, -10px)' : '0'
                      }}
                    >
                      <h3 className="text-white font-bold leading-tight mb-1 md:mb-1.5 lg:mb-2" 
                          style={{ fontSize: 'clamp(0.7rem, 1.1vw, 1rem)' }}>
                        {milestone.title}
                      </h3>
                      <p className="text-white leading-snug opacity-90" 
                         style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.875rem)' }}>
                        {milestone.description}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.3 + (index * 0.25),
                        ease: "easeOut"
                      }}
                      className="absolute rounded-full bg-green-500"
                      style={{ 
                        width: 'clamp(8px, 0.7vw, 12px)',
                        height: 'clamp(8px, 0.7vw, 12px)',
                        bottom: 'clamp(48px, 7vh, 78px)'
                      }}
                    />
                    
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.9 + (index * 0.25),
                        ease: "easeOut"
                      }}
                      className="absolute w-0.5 bg-white origin-top"
                      style={{ 
                        height: 'clamp(35px, 6vh, 65px)',
                        top: 'calc(-1 * clamp(48px, 7vh, 78px))'
                      }}
                    />
                    
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.1 + (index * 0.25),
                        ease: "backOut"
                      }}
                      className="absolute rounded-full bg-green-600 border-white z-10"
                      style={{ 
                        width: 'clamp(20px, 1.8vw, 28px)',
                        height: 'clamp(20px, 1.8vw, 28px)',
                        borderWidth: '3px',
                        boxShadow: '0 0 0 2px rgba(255,255,255,0.3)',
                        top: 'calc(-1 * clamp(10px, 1vw, 14px))'
                      }}
                    />
                  </>
                ) : (
                  <>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.1 + (index * 0.25),
                        ease: "backOut"
                      }}
                      className="absolute rounded-full bg-green-600 border-white z-10"
                      style={{ 
                        width: 'clamp(20px, 1.8vw, 28px)',
                        height: 'clamp(20px, 1.8vw, 28px)',
                        borderWidth: '3px',
                        boxShadow: '0 0 0 2px rgba(255,255,255,0.3)',
                        top: 'calc(-1 * clamp(10px, 1vw, 14px))'
                      }}
                    />
                    
                    <motion.div 
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.9 + (index * 0.25),
                        ease: "easeOut"
                      }}
                      className="absolute w-0.5 bg-white origin-top"
                      style={{ 
                        height: 'clamp(35px, 6vh, 65px)',
                        top: 'clamp(10px, 1vw, 14px)'
                      }}
                    />
                    
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.3 + (index * 0.25),
                        ease: "easeOut"
                      }}
                      className="absolute rounded-full bg-green-500"
                      style={{ 
                        width: 'clamp(8px, 0.7vw, 12px)',
                        height: 'clamp(8px, 0.7vw, 12px)',
                        top: 'clamp(48px, 7vh, 78px)'
                      }}
                    />

                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 1.2 + (index * 0.25),
                        ease: "easeOut"
                      }}
                      className="absolute text-center px-1.5 md:px-2 lg:px-2.5 xl:px-3"
                      style={{ 
                        width: 'clamp(120px, 11vw, 200px)',
                        top: 'clamp(55px, 8vh, 90px)',
                        marginLeft: index === 0 ? 'clamp(10px, 2vw, 30px)' : index === milestones.length - 1 ? 'clamp(-30px, -2vw, -10px)' : '0'
                      }}
                    >
                      <h3 className="text-white font-bold leading-tight mb-1 md:mb-1.5 lg:mb-2" 
                          style={{ fontSize: 'clamp(0.7rem, 1.1vw, 1rem)' }}>
                        {milestone.title}
                      </h3>
                      <p className="text-white leading-snug opacity-90" 
                         style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.875rem)' }}>
                        {milestone.description}
                      </p>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: 'clamp(20px, 3vw, 80px)' }}
      >
       
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/2 -translate-y-1/2"
        style={{ right: 'clamp(20px, 3vw, 80px)' }}
      >
        
      </motion.div>
    </div>

    <div className="md:hidden bg-white py-8 px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-green-800 text-3xl font-bold text-center mb-12"
      >
        Milestones
      </motion.h1>
      
      <div className="relative w-full mx-auto">
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-700 origin-top"
        />
        
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + (index * 0.15),
                ease: "easeOut"
              }}
              className="relative pl-16"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.6 + (index * 0.15),
                  ease: "backOut"
                }}
                className="absolute left-3.5 top-1 w-5 h-5 rounded-full border-4 border-green-700 bg-white"
              />
              
              <div>
                <h3 className="text-green-800 font-bold text-lg leading-tight mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default MilestonesTimeline;