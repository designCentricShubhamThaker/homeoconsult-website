import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

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
    <section className="w-full py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          <span className="text-green-700">Key</span>
          <span className="text-gray-800"> Team Members</span>
        </motion.h2>

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="bg-gray-200 rounded-lg p-6 flex flex-col"
            >
              {/* Profile Image */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Role with LinkedIn */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-green-700 font-bold text-base mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-gray-700 text-xs">
                    {member.role}
                  </p>
                </div>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  <Linkedin size={16} />
                </a>
              </div>

              {/* Description Sections */}
              <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
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