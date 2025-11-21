


// import React from 'react';
// import { motion } from 'framer-motion';

// export default function Milestones() {
//   // Circle dimensions
//   const circleRadius = 128; // outer circle radius (256px diameter / 2)
//   const centerX = 700; // center point X
//   const centerY = 450; // center point Y

//   // Calculate dot position on circle perimeter
//   const getDotPosition = (angle) => {
//     const angleRad = (angle * Math.PI) / 180;
//     const x = centerX + Math.cos(angleRad) * circleRadius;
//     const y = centerY + Math.sin(angleRad) * circleRadius;
//     return { x, y };
//   };

//   // Calculate text position (further out from circle)
//   const getTextPosition = (angle, offset = 200) => {
//     const angleRad = (angle * Math.PI) / 180;
//     const x = centerX + Math.cos(angleRad) * (circleRadius + offset);
//     const y = centerY + Math.sin(angleRad) * (circleRadius + offset);
//     return { x, y };
//   };

//   return (
//     <section className="w-full relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-green-700 to-green-600">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
//         style={{
//           backgroundImage: "url('/milestones.jpg')",
//         }}
//       />

//       <div className="relative  mx-auto px-4">
//         <div className=" mx-auto">
//           <div className="relative" style={{ height: '900px' }}>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.5 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="relative z-20"
//               style={{
//                 position: 'absolute',
//                 top: "320px",
//                 left: "570px",
//                 transform: 'translate(-50%, -50%)'
//               }}
//             >
//               <div className="relative w-64 h-64 rounded-full border-4 border-white flex items-center justify-center">
//                 <div className="w-52 h-52 rounded-full bg-white flex items-center justify-center shadow-2xl">
//                   <h2 className="text-green-700 font-bold text-4xl">
//                     Milestones
//                   </h2>
//                 </div>
//               </div>
//             </motion.div>

//             {/* 1. Established In 1975 - 120° (10 o'clock) */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(120).y - 7.5}px`,
//                 left: `${getDotPosition(120).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(120, 30).y - 20}px`,
//                 left: `${getTextPosition(120, 30).x - 280}px`,
//                 width: '260px'
//               }}
//             >
//               <div className="text-right">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">Established In 1975</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">Over 50 years of trusted medical consultancy.</p>
//               </div>
//             </motion.div>

//             {/* 2. 4 Clinical Centres - 165° */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(165).y - 7.5}px`,
//                 left: `${getDotPosition(165).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(165, 30).y - 20}px`,
//                 left: `${getTextPosition(165, 30).x - 280}px`,
//                 width: '260px'
//               }}
//             >
//               <div className="text-right">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">4 Clinical Centres</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">across Bombay serving diverse communities.</p>
//               </div>
//             </motion.div>

//             {/* 3. 60,000+ Cases - 210° */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(210).y - 7.5}px`,
//                 left: `${getDotPosition(210).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(210, 30).y - 20}px`,
//                 left: `${getTextPosition(210, 30).x - 280}px`,
//                 width: '260px'
//               }}
//             >
//               <div className="text-right">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">60,000+ Cases</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">consulted and treated worldwide.</p>
//               </div>
//             </motion.div>

//             {/* 4. Research & Evidence-Based Practice - 255° */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(255).y - 7.5}px`,
//                 left: `${getDotPosition(255).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(255, 30).y - 20}px`,
//                 left: `${getTextPosition(255, 30).x - 300}px`,
//                 width: '280px'
//               }}
//             >
//               <div className="text-right">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">Research & Evidence-Based Practice</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">ensuring scientific clinical outcomes.</p>
//               </div>
//             </motion.div>

//             {/* 5. Published Authors - 300° */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(300).y - 7.5}px`,
//                 left: `${getDotPosition(300).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(300, 30).y - 20}px`,
//                 left: `${getTextPosition(300, 30).x + 20}px`,
//                 width: '260px'
//               }}
//             >
//               <div className="text-left">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">Published Authors</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">Numerous articles in news and medical media.</p>
//               </div>
//             </motion.div>

//             {/* 6. Pioneers in Homeopathic Formulations - 345° */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(345).y - 7.5}px`,
//                 left: `${getDotPosition(345).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.7 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(345, 30).y - 20}px`,
//                 left: `${getTextPosition(345, 30).x + 20}px`,
//                 width: '280px'
//               }}
//             >
//               <div className="text-left">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">Pioneers in Homeopathic Formulations</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">www.nubindia.com</p>
//               </div>
//             </motion.div>

//             {/* 7. Affiliated with Leading Medical & Pharma Bodies - 30° */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(30).y - 7.5}px`,
//                 left: `${getDotPosition(30).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.8 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(30, 30).y - 20}px`,
//                 left: `${getTextPosition(30, 30).x + 20}px`,
//                 width: '300px'
//               }}
//             >
//               <div className="text-left">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">Affiliated with Leading Medical & Pharma Bodies</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">AMRSH, CCH, HAMM, HARP.</p>
//               </div>
//             </motion.div>

//             {/* 8. Global Presence - 75° */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.7, type: "spring", stiffness: 200 }}
//               className="bg-white rounded-full shadow-xl z-30"
//               style={{
//                 position: 'absolute',
//                 width: '15px',
//                 height: '15px',
//                 top: `${getDotPosition(75).y - 7.5}px`,
//                 left: `${getDotPosition(75).x - 7.5}px`
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.9 }}
//               className="z-10"
//               style={{
//                 position: 'absolute',
//                 top: `${getTextPosition(75, 30).y - 20}px`,
//                 left: `${getTextPosition(75, 30).x + 20}px`,
//                 width: '260px'
//               }}
//             >
//               <div className="text-left">
//                 <h3 className="text-white font-bold text-base mb-1 leading-tight">Global Presence</h3>
//                 <p className="text-white text-sm opacity-90 leading-snug">Patients from all over the world.</p>
//               </div>
//             </motion.div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from 'react';
import { motion } from 'framer-motion';

export default function Milestones() {
  // Circle dimensions - now relative to container
  const circleRadius = 128;
  const centerX = '50%'; // Use percentage for centering
  const centerY = '50%'; // Use percentage for centering

  // Calculate dot position on circle perimeter
  const getDotPosition = (angle) => {
    const angleRad = (angle * Math.PI) / 180;
    const x = Math.cos(angleRad) * circleRadius;
    const y = Math.sin(angleRad) * circleRadius;
    return { x, y };
  };

  // Calculate text position (further out from circle)
  const getTextPosition = (angle, offset = 30) => {
    const angleRad = (angle * Math.PI) / 180;
    const x = Math.cos(angleRad) * (circleRadius + offset);
    const y = Math.sin(angleRad) * (circleRadius + offset);
    return { x, y };
  };

  return (
    <section className="w-full relative overflow-hidden" style={{ height: '85vh' }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/milestones.jpg')",
        }}
      />

      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full h-full mx-auto px-4">
          <div className="relative flex items-center justify-center h-full">
            {/* Central Milestone Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-20"
            >
              <div className="relative w-64 h-64 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-white flex items-center justify-center shadow-2xl">
                  <h2 className="text-green-700 font-bold text-4xl">
                    Milestones
                  </h2>
                </div>
              </div>
            </motion.div>

            {/* 1. Established In 1975 - 120° (10 o'clock) */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(120).x}px), calc(-50% + ${getDotPosition(120).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '20%',
                top: '20%',
                transform: `translate(calc(-50% + ${getTextPosition(120, 30).x - 280}px), calc(-50% + ${getTextPosition(120, 30).y - 20}px))`,
                width: '260px'
              }}
            >
              <div className="text-right">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">Established In 1975</h3>
                <p className="text-white text-sm opacity-90 leading-snug">Over 50 years of trusted medical consultancy.</p>
              </div>
            </motion.div>

            {/* 2. 4 Clinical Centres - 165° */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(165).x}px), calc(-50% + ${getDotPosition(165).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '15%',
                top: '40%',
                transform: `translate(calc(-50% + ${getTextPosition(165, 30).x - 280}px), calc(-50% + ${getTextPosition(165, 30).y - 20}px))`,
                width: '260px'
              }}
            >
              <div className="text-right">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">4 Clinical Centres</h3>
                <p className="text-white text-sm opacity-90 leading-snug">across Bombay serving diverse communities.</p>
              </div>
            </motion.div>

            {/* 3. 60,000+ Cases - 210° */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(210).x}px), calc(-50% + ${getDotPosition(210).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '20%',
                top: '60%',
                transform: `translate(calc(-50% + ${getTextPosition(210, 30).x - 280}px), calc(-50% + ${getTextPosition(210, 30).y - 20}px))`,
                width: '260px'
              }}
            >
              <div className="text-right">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">60,000+ Cases</h3>
                <p className="text-white text-sm opacity-90 leading-snug">consulted and treated worldwide.</p>
              </div>
            </motion.div>

            {/* 4. Research & Evidence-Based Practice - 255° */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(255).x}px), calc(-50% + ${getDotPosition(255).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '35%',
                top: '80%',
                transform: `translate(calc(-50% + ${getTextPosition(255, 30).x - 300}px), calc(-50% + ${getTextPosition(255, 30).y - 20}px))`,
                width: '280px'
              }}
            >
              <div className="text-right">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">Research & Evidence-Based Practice</h3>
                <p className="text-white text-sm opacity-90 leading-snug">ensuring scientific clinical outcomes.</p>
              </div>
            </motion.div>

            {/* 5. Published Authors - 300° */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(300).x}px), calc(-50% + ${getDotPosition(300).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '60%',
                top: '60%',
                transform: `translate(calc(-50% + ${getTextPosition(300, 30).x + 20}px), calc(-50% + ${getTextPosition(300, 30).y - 20}px))`,
                width: '260px'
              }}
            >
              <div className="text-left">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">Published Authors</h3>
                <p className="text-white text-sm opacity-90 leading-snug">Numerous articles in news and medical media.</p>
              </div>
            </motion.div>

            {/* 6. Pioneers in Homeopathic Formulations - 345° */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(345).x}px), calc(-50% + ${getDotPosition(345).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '60%',
                top: '20%',
                transform: `translate(calc(-50% + ${getTextPosition(345, 30).x + 20}px), calc(-50% + ${getTextPosition(345, 30).y - 20}px))`,
                width: '280px'
              }}
            >
              <div className="text-left">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">Pioneers in Homeopathic Formulations</h3>
                <p className="text-white text-sm opacity-90 leading-snug">www.nubindia.com</p>
              </div>
            </motion.div>

            {/* 7. Affiliated with Leading Medical & Pharma Bodies - 30° */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(30).x}px), calc(-50% + ${getDotPosition(30).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '65%',
                top: '40%',
                transform: `translate(calc(-50% + ${getTextPosition(30, 30).x + 20}px), calc(-50% + ${getTextPosition(30, 30).y - 20}px))`,
                width: '300px'
              }}
            >
              <div className="text-left">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">Affiliated with Leading Medical & Pharma Bodies</h3>
                <p className="text-white text-sm opacity-90 leading-snug">AMRSH, CCH, HAMM, HARP.</p>
              </div>
            </motion.div>

            {/* 8. Global Presence - 75° */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7, type: "spring", stiffness: 200 }}
              className="bg-white rounded-full shadow-xl z-30"
              style={{
                position: 'absolute',
                width: '15px',
                height: '15px',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${getDotPosition(75).x}px), calc(-50% + ${getDotPosition(75).y}px))`
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="z-10"
              style={{
                position: 'absolute',
                left: '40%',
                top: '5%',
                transform: `translate(calc(-50% + ${getTextPosition(75, 30).x + 20}px), calc(-50% + ${getTextPosition(75, 30).y - 20}px))`,
                width: '260px'
              }}
            >
              <div className="text-left">
                <h3 className="text-white font-bold text-base mb-1 leading-tight">Global Presence</h3>
                <p className="text-white text-sm opacity-90 leading-snug">Patients from all over the world.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}