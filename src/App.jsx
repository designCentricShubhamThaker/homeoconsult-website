import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs/AboutUs";
import DiseaseSelection from "./AilmentsAndTreatments.jsx/DiseaseSelection";
import Homeopathy from "./AboutHomeopathy/Homeopathy";


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/ailments-and-treatments/:diseaseName" element={<DiseaseSelection />} />
        <Route path="/about-homeopathy" element={<Homeopathy />} />
      </Routes>
    </Router>
  );
}

export default App;