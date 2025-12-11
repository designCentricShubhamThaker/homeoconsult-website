import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs/AboutUs";
import DiseaseSelection from "./AilmentsAndTreatments.jsx/DiseaseSelection";
import Homeopathy from "./AboutHomeopathy/Homeopathy";

import ServicePlan from "./Services/ServicePlan";
import ComprehensivePlan from "./Services/Pages/ComprehensivePlan";
import CuredCasesGallery from "./CuredCases/CuredCaseGallery";
import HomeopathyFAQ from "./FAQ/HomeopathyFAQ";
import ConsumerHealthFAQ from "./FAQ/ConsumerHealthFAQ";
import ContactUsForm from "./ContactUs/ContactUsForm";
import DoctorSec from "./DoctorsSection.jsx/DoctorSec";
import AllTestimonails from "./Testimonials/AllTestimonails";
import BlogSection from "./Blogs/BlogSection";
import DisclaimerComponent from "./components/Disclaimer";



function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/ailments-and-treatments/:diseaseName" element={<DiseaseSelection />} />
        <Route path="/about-homeopathy" element={<Homeopathy />} />
        <Route path="/services" element={<ServicePlan />} />
        <Route path="/cured-cases" element={<CuredCasesGallery />} />
        <Route path="/faq's" element={<HomeopathyFAQ />} /> 
        <Route path="/testimonials" element={<AllTestimonails />} /> 
        <Route path="/ContactUs" element={<ContactUsForm />} /> 
        <Route path="/blogs" element={<BlogSection />} /> 
        <Route path="/disclaimer" element={<DisclaimerComponent />} /> 
        <Route path="/Doctors-section" element={<DoctorSec />} /> 
        <Route path="/consumer-health-faq" element={<ConsumerHealthFAQ />} />
        <Route path="/services/comprehensive-plan" element={<ComprehensivePlan />} />
      </Routes>
    </Router>
  );
}

export default App;