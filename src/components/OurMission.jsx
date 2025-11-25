import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MissionSection() {
  const stats = [
    { number: 100, suffix: '+', label: 'Years Homeopathic\nLineage' },
    { number: 3, suffix: '', label: 'Clinical Centres &\nPharmacies' },
    { number: 7, suffix: '', label: 'Decades Of\nHomeopathic' },
    { number: 60, suffix: '', label: 'years of\nResearch' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

 return (
  <div className="bg-white py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 overflow-hidden">
    <div>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-30 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 flex justify-center px-3 sm:px-4 md:px-6"
        >
          <img
            src="/millions.png"
            alt="Our Mission - Millions Healed - With Advanced Homeopathy Over 100 Years"
            className="w-full h-auto"
          />
        </motion.div>

        <div className="relative w-screen bg-[#d4f0e0] min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 pb-20 sm:pb-24 lg:pb-8 flex items-center justify-between">
          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:flex lg:flex-wrap lg:gap-8 xl:gap-12 2xl:gap-16 flex-1"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col text-center"
              >
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-emerald-700 mb-1 sm:mb-2 leading-none">
                  <Counter end={stat.number} suffix={stat.suffix} duration={2000} />
                </h3>
                <p className="text-gray-700 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-tight whitespace-pre-line">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Family Image - Mobile (centered below) and Desktop (top right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-52 md:w-56 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:-top-2 lg:right-0 xl:-top-4 2xl:-top-6 lg:w-[28%] xl:w-[30%] 2xl:w-[32%] z-10"
          >
            <img
              src="/family.png"
              alt="Happy Family"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Flower Decoration - Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 xl:-bottom-12 2xl:-bottom-14 xl:w-40 2xl:w-48 z-20"
          >
            <img
              src="/flower.png"
              alt="Flower Decoration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);
}

// Custom Counter Component
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = Date.now();
          const startValue = 0;
          
          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          
          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={counterRef}>
      {count}{suffix}
    </span>
  );
}