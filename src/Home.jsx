import React from "react";
import Layout from "./Layout/Layout";
import Banner from "./components/Banner";
import WelcomeSection from "./components/Welcome";
import DiseaseCarousel from "./components/DiseaseCarousel";
import HomeopathyClinic from "./components/HomeopathyClinic";
import OurMission from "./components/OurMission";
import DoctorProfile from "./components/DoctorProfile";
import TreatmentSelector from "./components/TreatmentSelector";
import BlogListing from "./components/BlogListing";
import TestimonialDisplay from "./components/Testimonials";
import YouTubeVideos from "./components/YoutubeVideos";
import AppointmentModal from "./components/AppointmentModal";
import { useState } from "react";
import { Calendar } from "lucide-react";

const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0d6e4f] text-white px-4 py-8 rounded-l-lg shadow-lg hover:bg-[#0a5940] transition-colors flex flex-col items-center gap-2"
        >
          <Calendar className="w-5 h-5 rotate-90" />
          <span className="text-sm font-semibold whitespace-nowrap transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
            Book an Appointment
          </span>
        </button>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Banner />
      <WelcomeSection />
      <DiseaseCarousel />
      <HomeopathyClinic />
      <OurMission />
      <DoctorProfile />
      <TreatmentSelector />
      <TestimonialDisplay />
      <YouTubeVideos />
      <BlogListing />
    </Layout>

  );
};

export default Home;
