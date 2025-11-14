import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const healthData = [
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
  }
];

export default function HomeopathyClinic() {
  const [selectedTopic, setSelectedTopic] = useState(healthData[0]);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-4 px-3"
        >
          <h1 className="text-xl font-bold">
            <span className="text-emerald-700">Best Homeopathy Clinic</span>{' '}
            <span className="text-gray-700">in India</span>
          </h1>
        </motion.div>

        <div className="px-3 pb-4">
          {/* Image */}
          <div className="relative h-48 rounded-xl overflow-hidden shadow-lg mb-3">
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
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            {healthData.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all duration-300 ${
                  selectedTopic.id === topic.id
                    ? 'bg-emerald-700 text-white shadow-lg'
                    : 'bg-white text-gray-600 shadow-md'
                }`}
              >
                {topic.title}
              </motion.button>
            ))}
          </div>

          {/* Diseases Grid */}
          <div className="bg-emerald-700 rounded-xl p-4 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTopic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-white font-bold text-base mb-3">Conditions We Treat</h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-white text-xs">
                  {selectedTopic.diseases.flat().map((disease, idx) => (
                    <motion.div
                      key={idx}
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

  // DESKTOP VIEW
  return (
    <div className="pt-20 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-bold mb-10">
          <span className="text-[#147140] ">Best Homeopathy Clinic</span>{' '}
          <span className="text-[#147140] font-normal ">in India</span>
        </h1>
      </motion.div>

      <div className="w-[95vw] max-w-6xl h-[65vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
      
        <div className="w-[30%] relative h-full">
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
        <div className="w-[30%] flex items-center justify-center bg-gray-50">
          <div className="flex flex-col space-y-4 px-4">
            {healthData.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  selectedTopic.id === topic.id
                    ? 'text-gray-900 scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {topic.title}
              </motion.button>
            ))}
          </div>
        </div>


     <div className="w-[40%] bg-[#147140] px-6 py-4 flex items-center justify-center">
  <AnimatePresence mode="wait">
    <motion.div
      key={selectedTopic.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-white text-sm">
        {selectedTopic.diseases.flat().map((disease, idx) => (
          <motion.div
            key={idx}
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