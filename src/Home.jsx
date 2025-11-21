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

const Home = () => {
  return (
    <Layout>
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
