import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn } from "react-icons/fa";

export default function KeyTeamMembers() {
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Vinod S. Vaknalli',
      role: '(Veteran Homeopath-M.D. Founder)',
      image: '/team-member-1.png',
      specialties: 'Specialty: Chronic Diseases, Including Children\'s ailments, Infertility, Rheumatology, and Pain Management.',
      experience: 'Experience: Over 70 years of practice, described as a "Veteran Homeopath", who has consulted hundreds of patients globally.',
      background: 'Founder: Established NuB India, a major homeopathic pharmaceutical company, and has formulated over 40 clinically-tested homeopathic formulations.',
      qualifications: 'Qualifications: Holds an L.C.E.H (1954), D.F.Hom (London), and has served as an examiner for the B.H.M.S. Degree course.',
      linkedinUrl: '#'
    },
    {
      id: 2,
      name: 'Judy Shah',
      role: '(Diet and Nutritional Consultant)',
      image: '/team-member-2.png',
      specialties: 'Role: Handles Overseas clients and is an International Relations Executive.',
      experience: 'Expertise: Nutritionist + Lifestyle consultant (ACE Certified, USA) with a background in Microbiology.',
      background: 'Focus: Profiles diverse about patient lifestyles and the services offered, ensuring a holistic approach for international patients.',
      qualifications: '',
      linkedinUrl: '#'
    },
    {
      id: 3,
      name: 'Sara Vaknalli',
      role: 'Relationship Manager',
      image: '/team-member-3.png',
      specialties: 'Role: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
      experience: 'Expertise: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      background: 'Focus: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      qualifications: '',
      linkedinUrl: '#'
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
  <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 bg-white">
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
      >
        <span className="text-[#207755] font-bold">Key</span>
        <span className="text-[#207755] font-normal"> Team Members</span>
      </motion.h2>

      {/* Team Members Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full"
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            className="bg-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 flex flex-col"
          >
            {/* Profile Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-3 sm:mb-4 rounded-full bg-white overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Role with LinkedIn */}
            <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-[#207755] font-bold text-sm sm:text-base md:text-lg mb-0.5">
                  {member.name}
                </h3>
                <p className="text-[#207755] text-xs sm:text-sm">
                  {member.role}
                </p>
              </div>
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-1.5 sm:p-2 bg-[#0077b5] hover:bg-[#005885] text-white rounded transition-colors"
              >
                <FaLinkedinIn size={14} className="sm:w-4 sm:h-4" />
              </a>
            </div>

            {/* Description Sections */}
            <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
              {member.specialties && (
                <p>{member.specialties}</p>
              )}
              {member.experience && (
                <p>{member.experience}</p>
              )}
              {member.background && (
                <p>{member.background}</p>
              )}
              {member.qualifications && (
                <p>{member.qualifications}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
}