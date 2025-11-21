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
    <div className=" bg-white py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-30 mb-8 sm:mb-12 lg:mb-16 flex justify-center"
          >
            <img
              src="/millions.png"
              alt="Our Mission - Millions Healed - With Advanced Homeopathy Over 100 Years"
              className="w-full lg:max-w-4xl h-auto"
            />
          </motion.div>

          <div className="relative w-screen bg-[#d4f0e0] min-h-[220px] px-6 sm:px-8 lg:px-16 py-8 pb-24 lg:pb-8 flex items-center justify-between">
            {/* Stats Grid - 2x2 on mobile, flex row on desktop */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-6 sm:gap-8 lg:flex lg:flex-wrap lg:gap-12 xl:gap-26 flex-1"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col text-center"
                >
                  <h3 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl font-bold text-emerald-700 mb-2 leading-none">
                    <Counter end={stat.number} suffix={stat.suffix} duration={2000} />
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm lg:text-base font-medium leading-tight whitespace-pre-line">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>


      <motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-54 sm:w-60  lg:bottom-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:-top-4 sm:lg:-top-6 lg:lg:-top-8 lg:right-0 lg:w-2/6 z-10"
>
  <img
    src="/family.png"
    alt="Happy Family"
    className="w-full h-auto object-contain"
  />
</motion.div>




            
  
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden lg:block absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-28 sm:w-36 lg:w-44 xl:w-52 z-20"
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