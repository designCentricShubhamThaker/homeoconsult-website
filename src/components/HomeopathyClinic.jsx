import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const toSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

const healthData = [
  {
    id: 'child',
    title: "Child's Health",
    subtitle: 'Homeopathy for children and teens',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    diseases: [
      ['ADHD', 'Irritable Bowel'],
      ['Adenoids', 'Molluscum'],
      ['Asthma', 'Nasal Allergy'],
      ['Autism', 'Sinusitis'],
      ['Chalazion & Stys', 'Tonsillitis'],
      ['Depression', 'Warts'],
      ['Dystonia', 'Eczema']
    ]
  },

  {
    id: 'women',
    title: "Women's Health",
    subtitle: 'Homeopathy for women',
    image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=800&q=80',
    diseases: [
      ['Acne', 'Hemorrhoids'],
      ['Asthma', 'Infertility'],
      ['Arthritis', 'Menopause'],
      ['Depression', 'Migraine'],
      ['Eczema', 'PCOS or PCOD'],
      ['Fibroadenoma', 'Spondylosis'],
      ['Fibroids', 'Vitiligo'],
      ['Hairfall', 'Warts/Corns']
    ]
  },

  {
    id: 'men',
    title: "Men's Health",
    subtitle: 'Homeopathy for adult men',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    diseases: [
      ['Acne', 'Hemorrhoids'],
      ['Calcaneal Spur', 'Insomnia'],
      ['Depression', 'Kidney Stones'],
      ['Fissure In Ano', 'Lipoma'],
      ['Ganglion (Cyst)', 'Prostate'],
      ['Hairfall', 'Sciatica'],
      ['Sinusitis', 'Spondilitis'],
      ['Vitiligo', 'Warts/Corns']
    ]
  },

  {
    id: 'skin',
    title: 'Skin Health',
    subtitle: 'Homeopathy for skin health',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    diseases: [
      ['Acne', 'LipomaMolluscum'],
      ['Alopecia areata', 'Psoriasis'],
      ['Chalazion & Stys', 'Skin Allergies'],
      ['Eczema', 'Urticaria/Hives'],
      ['Hairfall', 'Vasculitis'],
      ['Herpes Zoster', 'Vitiligo'],
      ['Lichen Planus', 'Warts']
    ]
  },
];

export default function HomeopathyClinic() {
  const [selectedTopic, setSelectedTopic] = useState(healthData[0]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  if (isMobile) {
    return (
      <div className="bg-linear-to-br from-gray-50 to-gray-100 overflow-x-hidden py-4 sm:py-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-3 sm:py-4 px-3 sm:px-4"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
            <span className="text-emerald-700">Best Homeopathy Clinic</span>{' '}
            <span className="text-gray-700">in India</span>
          </h1>
        </motion.div>

        <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
          {/* Image */}
          <div className="relative h-40 sm:h-48 md:h-56 rounded-lg sm:rounded-xl overflow-hidden shadow-lg mb-3 sm:mb-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedTopic.id}
                src={selectedTopic.image}
                alt={selectedTopic.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Topics as Pills */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 mb-3 sm:mb-4 scrollbar-hide">
            {healthData.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${selectedTopic.id === topic.id
                    ? 'bg-emerald-700 text-white shadow-lg'
                    : 'bg-white text-gray-600 shadow-md'
                  }`}
              >
                {topic.title}
              </motion.button>
            ))}
          </div>

          {/* Diseases Grid */}
          <div className="bg-emerald-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTopic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-white font-bold text-sm sm:text-base mb-2 sm:mb-3">Conditions We Treat</h3>
                <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 text-white text-xs sm:text-sm">
                  {selectedTopic.diseases.flat().map((disease, idx) => (
                    <motion.div
                      key={idx}
                      onClick={() => navigate(`/ailments-and-treatments/${toSlug(disease)}`)}
                      className="cursor-pointer hover:underline"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      {disease}
                    </motion.div>
                  ))}

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 sm:mb-8 md:mb-10"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-[#147140] font-bold">
          <span className="text-[#147140]">Best Homeopathy Clinic</span>{' '}
          <span className="text-[#147140] font-normal">in India</span>
        </h1>
      </motion.div>

      <div className="w-full lg:w-[95vw] xl:w-[90vw] 2xl:w-[85vw] h-auto lg:h-[60vh] xl:h-[65vh] 2xl:h-[70vh] bg-white rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* Image Section */}
        <div className="w-full lg:w-[30%] xl:w-[32%] relative h-64 lg:h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedTopic.id}
              src={selectedTopic.image}
              alt={selectedTopic.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Topics Section */}
        <div className="w-full lg:w-[30%] xl:w-[28%] flex items-center justify-center bg-gray-50 py-6 lg:py-0">
          <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 xl:space-y-4 px-4 overflow-x-auto lg:overflow-visible w-full lg:w-auto">
            {healthData.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-lg font-semibold text-base sm:text-lg md:text-xl whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${selectedTopic.id === topic.id
                    ? 'text-gray-900 scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {topic.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Diseases Section */}
        <div className="w-full lg:w-[40%] bg-[#147140] px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTopic.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-5 md:gap-x-6 gap-y-4 sm:gap-y-6 md:gap-y-6 text-white text-xs sm:text-sm md:text-base">
                {selectedTopic.diseases.flat().map((disease, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => navigate(`/ailments-and-treatments/${toSlug(disease)}`)}
                    className="cursor-pointer hover:underline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {disease}
                  </motion.div>
                ))}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}