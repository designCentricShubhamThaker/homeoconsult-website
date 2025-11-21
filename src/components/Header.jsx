
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, LogIn, ChevronDown } from "lucide-react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DISEASES = [
  "ACNE",
  "Adenoids",
  "ADHD",
  "Alopecia areata",
  "Ankylosing Spondilitis",
  "Arthritis",
  "Asthma",
  "Autism",
  "Calcaneal Spur",
  "Cervical Spondylosis",
  "Chalazion & Stys",
  "Depression",
  "Dystonia",
  "ECZEMA",
  "Emotions & Stress",
  "Fibroadenoma",
  "Fibroids",
  "Fissure In Ano",
  "Ganglion (Cyst)",
  "Hair Fall",
  "Hemorrhoids (Piles)",
  "Herpes Zoster (Shingles)",
  "Infertility",
  "Insomnia/Sleep Disorder",
  "Irritable Bowel Syndrome",
  "Kidney Stone",
  "Lichen Planus",
  "Lipoma",
  "Migraine Headaches",
  "Molluscum contagiosum",
  "Nasal Allergy",
  "PCOS or PCOD",
  "Perimenopause & Menopause",
  "Prostatic Hyperplasia (BPH)",
  "Psoriasis",
  "Sciatica",
  "Sinusitis",
  "Skin Allergies",
  "Tinnitus & Meniere's Disease",
  "Tonsillitis",
  "Trigeminal Neuralgia",
  "Ulcerative Colitis/Crohns",
  "Urticaria/Hives",
  "Vasculitis",
  "Vitiligo",
  "Vocal Cord Nodule",
  "Warts/Corns"
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAilmentsOpen, setIsAilmentsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      
      // Check if scrolled past threshold
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "About Homeopathy", path: "/about-homeopathy" },
    { name: "Services", path: "/services" },
    { name: "Cured Cases", path: "/cured-cases" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '-')
      .trim();
  };

  const handleDiseaseClick = (diseaseName) => {
    const slug = createSlug(diseaseName);
    navigate(`/ailments-and-treatments/${slug}`);
    setIsAilmentsOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className="bg-white shadow-sm sticky top-0 z-50"
      initial={{ y: 0 }}
      animate={{
        y: scrollDirection === "down" && lastScrollY > 100 ? -100 : 0,
        boxShadow: isScrolled
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/homeo_consult_logo.jpg"
              alt="Homeo Consult Logo"
              className="h-20 w-auto object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-col items-end space-y-3">
            {/* Contact & Login */}
            <div className="flex items-center space-x-4 text-sm">
              <motion.a
                href="tel:+1-838-440-3676"
                className="flex items-center text-black font-bold hover:text-green-700 transition-colors"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-6 h-6 flex items-center justify-center bg-green-700 rounded-full mr-1.5">
                  <Phone className="w-3 h-3 text-white" />
                </span>
                USA-Canada: +1-838-440-3676
              </motion.a>

              <motion.a
                href="tel:+918826180203"
                className="flex items-center text-black font-bold hover:text-green-700 transition-colors"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-6 h-6 flex items-center justify-center bg-green-700 rounded-full mr-1.5">
                  <Phone className="w-3 h-3 text-white" />
                </span>
                India: +91-8826180203
              </motion.a>

              <motion.button
                className="flex items-center bg-[#98d1ac] text-black px-5 py-1.5 rounded-full text-sm transition-all space-x-2 font-semibold uppercase border-2 border-transparent hover:bg-white hover:text-green-700 hover:border-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </motion.button>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  className="text-gray-700 hover:text-green-700 text-sm font-medium transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-green-700"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}

              {/* Ailments Dropdown */}
              <div className="relative">
                <motion.button
                  className="flex items-center text-gray-700 hover:text-green-700 text-sm font-medium transition-colors"
                  onMouseEnter={() => setIsAilmentsOpen(true)}
                  whileHover={{ y: -2 }}
                >
                  Ailments & Treatments
                  <motion.div
                    animate={{ rotate: isAilmentsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isAilmentsOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border max-h-96 overflow-y-auto z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setIsAilmentsOpen(true)}
                      onMouseLeave={() => setIsAilmentsOpen(false)}
                    >
                      <div className="p-2">
                        {DISEASES.map((disease, index) => (
                          <motion.button
                            key={disease}
                            onClick={() => handleDiseaseClick(disease)}
                            className="w-full text-left px-4 py-3 rounded-md hover:bg-green-50 text-gray-700 hover:text-green-700 text-sm font-medium transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02, duration: 0.2 }}
                            whileHover={{ x: 4, backgroundColor: "rgba(240, 253, 244, 1)" }}
                          >
                            {disease}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-4 space-y-4 border-t border-gray-100">
                {/* Mobile Contact */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.a
                    href="tel:+1-838-440-3676"
                    className="flex items-center text-black font-semibold hover:text-green-700 text-sm transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-green-700 rounded-full mr-2">
                      <Phone className="w-4 h-4 text-white" />
                    </span>
                    <div>
                      <span className="text-xs text-gray-500 block">USA-Canada</span>
                      +1-838-440-3676
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+918826180203"
                    className="flex items-center text-black font-semibold hover:text-green-700 text-sm transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-green-700 rounded-full mr-2">
                      <Phone className="w-4 h-4 text-white" />
                    </span>
                    <div>
                      <span className="text-xs text-gray-500 block">India</span>
                      +91-8826180203
                    </div>
                  </motion.a>

                  <motion.button
                    className="w-full flex items-center justify-center bg-[#98d1ac] text-black px-5 py-3 rounded-full font-semibold uppercase hover:bg-white hover:text-green-700 hover:border-green-700 border-2 border-transparent transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    <span>Login</span>
                  </motion.button>
                </motion.div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-1 pt-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-green-700 hover:bg-green-50 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}

                  {/* Mobile Ailments Accordion */}
                  <motion.div
                    className="border-t border-gray-100 pt-2 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setIsAilmentsOpen(!isAilmentsOpen)}
                      className="w-full flex items-center justify-between text-gray-700 hover:text-green-700 hover:bg-green-50 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Ailments & Treatments
                      <motion.div
                        animate={{ rotate: isAilmentsOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isAilmentsOpen && (
                        <motion.div
                          className="pl-4 pr-2 max-h-64 overflow-y-auto mt-1"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {DISEASES.map((disease, index) => (
                            <motion.button
                              key={disease}
                              onClick={() => handleDiseaseClick(disease)}
                              className="w-full text-left px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-md text-sm transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.02 }}
                              whileHover={{ x: 4 }}
                            >
                              {disease}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}