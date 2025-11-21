import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Legacy() {
  const stats = [
    { 
      number: 3, 
      suffix: '', 
      label: 'Generations of Homeopaths since 1937' 
    },
    { 
      number: 3, 
      suffix: '', 
      label: 'Clinics in Mumbai & Global Online Consultations' 
    },
    { 
      number: 30, 
      suffix: '+', 
      label: 'Years in Homeopathic Pharma (NHP India)' 
    },
    { 
      number: 1, 
      suffix: 'M+', 
      label: 'Cases Treated' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative w-full">
      <div className="absolute inset-0">
        <img
          src="/legacy.jpg"
          alt="Legacy Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 md:mb-12 lg:mb-16 text-center"
        >
          Our Legacy
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-4"
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 md:mb-3 leading-none">
                <Counter 
                  end={stat.number} 
                  suffix={stat.suffix} 
                  duration={2000} 
                />
              </h3>
              
              <p className="text-white text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

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