import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader2, X, Plus, Check, MapPin } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import DiseaseTreatmentSection from './DiseaseTreamtmentSelector';
import { Calendar, CreditCard, Search } from 'lucide-react';

const Banner = () => {
  const { diseaseName } = useParams();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [packages, setPackages] = useState([]);
  const [primaryDisease, setPrimaryDisease] = useState('');
  const [secondaryDiseases, setSecondaryDiseases] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(false);
  const [secondarySearch, setSecondarySearch] = useState('');
  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableTerms, setAvailableTerms] = useState([]);
  const [priceInfo, setPriceInfo] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const caseStudyRefs = useRef({});

  const DISEASES = [
    "ACNE", "Adenoids", "ADHD", "Alopecia areata", "Ankylosing Spondilitis",
    "Arthritis", "Asthma", "Autism", "Calcaneal Spur", "Cervical Spondylosis",
    "Chalazion & Stys", "Depression", "Dystonia", "ECZEMA", "Emotions & Stress",
    "Fibroadenoma", "Fibroids", "Fissure In Ano", "Ganglion (Cyst)", "Hair Fall",
    "Hemorrhoids (Piles)", "Herpes Zoster (Shingles)", "Infertility",
    "Insomnia/Sleep Disorder", "Irritable Bowel Syndrome", "Kidney Stone",
    "Lichen Planus", "Lipoma", "Migraine Headaches", "Molluscum contagiosum",
    "Nasal Allergy", "PCOS or PCOD", "Perimenopause & Menopause",
    "Prostatic Hyperplasia (BPH)", "Psoriasis", "Sciatica", "Sinusitis",
    "Skin Allergies", "Tinnitus & Meniere's Disease", "Tonsillitis",
    "Trigeminal Neuralgia", "Ulcerative Colitis/Crohns", "Urticaria/Hives",
    "Vasculitis", "Vitiligo", "Vocal Cord Nodule", "Warts / Corns", "Not Listed"
  ];

  const filteredSecondaryDiseases = DISEASES.filter(d =>
    d !== primaryDisease &&
    d.toLowerCase().includes(secondarySearch.toLowerCase())
  );

  const scrollToCaseStudy = (caseStudyId) => {
    setSelectedCaseStudy(caseStudyId);
    if (caseStudyRefs.current[caseStudyId]) {
      caseStudyRefs.current[caseStudyId].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:8000/diseases/by-name/${diseaseName}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Disease not found');
          }
          throw new Error('Failed to load disease details');
        }

        const data = await response.json();
        setDisease(data);

        if (data.case_studies && data.case_studies.length > 0) {
          setOpenAccordions({
            [`${data.case_studies[0].id}-why-choose`]: true
          });
        }
      } catch (err) {
        console.error('Error fetching disease:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (diseaseName) {
      fetchDiseaseDetails();
    }
  }, [diseaseName]);

  const toggleAccordion = (studyId, section) => {
    const key = `${studyId}-${section}`;
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isOpen = (studyId, section) => {
    return openAccordions[`${studyId}-${section}`];
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleSecondaryDisease = (disease) => {
    if (secondaryDiseases.includes(disease)) {
      setSecondaryDiseases(secondaryDiseases.filter(d => d !== disease));
    } else {
      setSecondaryDiseases([...secondaryDiseases, disease]);
    }
  };

  const handleStartTreatment = () => {
    if (!primaryDisease || !selectedRegion || !selectedTerm || !paymentMethod) {
      alert('Please complete all required fields before starting treatment');
      return;
    }

    const treatmentData = {
      primaryDisease,
      secondaryDiseases,
      region: selectedRegion,
      term: selectedTerm,
      priceInfo,
      paymentMethod
    };
    console.log('Navigating with data:', treatmentData);
    navigate('/services/comprehensive-plan', {
      state: { treatmentData }
    });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:8000/packages', {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPackages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (disease?.disease_name && packages.length > 0) {
      const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");
      if (comprehensivePlan && comprehensivePlan.regions) {
        const matchingRegions = comprehensivePlan.regions.filter(
          r => r.disease.toLowerCase() === disease.disease_name.toLowerCase()
        );

        const regions = [...new Set(matchingRegions.map(r => r.location))];
        setAvailableRegions(regions);

        const exactDiseaseName = DISEASES.find(d => d.toLowerCase() === disease.disease_name.toLowerCase());
        setPrimaryDisease(exactDiseaseName || disease.disease_name);
      }
    }
  }, [packages, disease?.disease_name]);

  useEffect(() => {
    if (primaryDisease && selectedRegion && packages.length > 0) {
      const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");
      if (comprehensivePlan && comprehensivePlan.regions) {
        const regionData = comprehensivePlan.regions.find(
          r => r.disease.toLowerCase() === primaryDisease.toLowerCase() && r.location === selectedRegion
        );
        if (regionData) {
          const terms = regionData.duration_months.map((months, idx) => ({
            months,
            price: regionData.prices[idx],
            currency: regionData.currency
          }));
          setAvailableTerms(terms);
          setSelectedTerm('');
          setPriceInfo(null);
        }
      }
    }
  }, [primaryDisease, selectedRegion, packages]);

  useEffect(() => {
    if (disease?.disease_name && !primaryDisease) {
      setPrimaryDisease(disease.disease_name);
    }
  }, [disease?.disease_name]);

  useEffect(() => {
    if (selectedTerm && availableTerms.length > 0) {
      const termInfo = availableTerms.find(t => t.months === parseInt(selectedTerm));
      setPriceInfo(termInfo);
    }
  }, [selectedTerm, availableTerms]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading disease details...</p>
        </div>
      </div>
    );
  }

  if (error || !disease) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Disease Not Found</h2>
          <p className="text-gray-600 mb-4">
            {error || "The requested disease information could not be found."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const isPsychological = disease.disease_type?.toLowerCase() === 'psychological';

  return (
    <div className="bg-gray-50">
      {/* Banner Section */}
      <div className="relative">
        <div className="hidden md:grid md:grid-cols-2 h-96">
          <div
            className="relative h-full bg-cover bg-center flex items-center justify-start px-12 lg:px-8"
            style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
          >
            <div className="text-white text-left max-w-lg p-6">
              <h2 className="text-5xl lg:text-6xl mb-6">Ailments & Treatments</h2>
              <p className="text-xl mb-3 font-semibold">
                Regain {disease.disease_name} With Homeopathy
              </p>
              <p className="text-lg lg:text-xl font-medium">Dr. Anish Vaknalli</p>
            </div>
          </div>

          <div className="relative h-full overflow-hidden">
            <img
              src={`data:image/jpeg;base64,${disease.banner_image}`}
              alt={disease.disease_name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative h-64 overflow-hidden">
            <img
              src={`data:image/jpeg;base64,${disease.banner_image}`}
              alt={disease.disease_name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-6 py-10 text-center" style={{ backgroundImage: "url('/ailments_banner.jpg')" }}>
            <h2 className="text-2xl mb-4 text-white">Ailments & Treatments</h2>
            <p className="text-xl mb-2 font-semibold text-white">
              Regain {disease.disease_name}
            </p>
            <p className="text-lg mb-4 text-white/90">With Homeopathy</p>
            <div className="pt-4 border-t border-teal-400/30 mt-4">
              <p className="text-base font-medium text-white">Dr. Anish Vaknalli</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <section className="mt-10">
          <DiseaseTreatmentSection disease={disease} />
        </section>

        {/* FOR PSYCHOLOGICAL TYPE */}
        {isPsychological ? (
          <>
            {/* Why Choose Section for Psychological */}
            {disease.why_choose_items && disease.why_choose_items.length > 0 && (
              <section className="w-full bg-[#E4F4E8] mt-4 py-10 px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {disease.why_choose_banner && (
                    <div className="w-full md:w-[340px]">
                      <img
                        src={`data:image/jpeg;base64,${disease.why_choose_banner}`}
                        alt="Why Choose Banner"
                        className="w-full h-[340px] object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#207755] mb-4">
                      Why Choose Homeopathy for <span className="font-normal">{diseaseName}</span> ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                      {disease.why_choose_items?.map(item => (
                        <div key={item.id}>
                          <h3 className="text-lg font-semibold text-[#207755] mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Patient Cured Cases for Psychological */}
            {disease.patient_case_studies && disease.patient_case_studies.length > 0 && (
              <section className="mt-10 px-4 md:px-6">
                <h2 className="text-3xl text-center font-bold text-[#207755] mb-8">
                  Patient <span className="font-normal">Cured Cases</span>
                </h2>

                {/* Cards Grid - Image + Title + Patient Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {disease.patient_case_studies?.map((caseStudy) => (
                    <div
                      key={caseStudy.id}
                      onClick={() => scrollToCaseStudy(caseStudy.id)}
                      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 ${selectedCaseStudy === caseStudy.id ? 'ring-4 ring-[#207755]' : ''
                        }`}
                    >
                      <div className="h-64 overflow-hidden">
                        <img
                          src={`data:image/jpeg;base64,${caseStudy.image}`}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-bold text-[#207755]">
                          {caseStudy.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detailed Case Studies - One Below Another */}
                <div className="space-y-8">
                  {disease.patient_case_studies?.map((caseStudy) => (
                    <div
                      key={caseStudy.id}
                      ref={(el) => (caseStudyRefs.current[caseStudy.id] = el)}
                      className={`bg-white rounded-lg shadow-lg p-6 md:p-8 transition-all ${selectedCaseStudy === caseStudy.id ? 'ring-4 ring-[#207755] shadow-2xl' : ''
                        }`}
                    >
                      <h3 className="text-2xl font-bold text-[#207755] mb-6 border-b-2 border-[#207755] pb-3">
                        {caseStudy.title}
                      </h3>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#207755] rounded-full"></span>
                          Patient Description
                        </h4>
                        <p className="text-gray-700 leading-relaxed pl-4">
                          {caseStudy.patient_description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#207755] rounded-full"></span>
                          Treatment
                        </h4>
                        <p className="text-gray-700 leading-relaxed pl-4 whitespace-pre-line">
                          {caseStudy.cured_case_treatment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* Additional Info Section - FOR PSYCHOLOGICAL TYPE */}
            {disease.additional_info && disease.additional_info.length > 0 && (
              <section className="mt-10 px-4 md:px-6">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-[#207755] mb-6">Additional Information</h2>
                  <div className="space-y-6">
                    {disease.additional_info.map((info, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                        <h3 className="text-lg font-semibold text-[#207755] mb-3">
                          {info.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            {disease.understandings && disease.understandings.length > 0 && (
              <section className="mt-10 px-4 md:px-6">
                <h2 className="text-2xl flex justify-center md:text-2xl mb-8">
                  <span className="text-[#207755] font-bold">Understanding</span>{' '}
                  <span className="text-[#207755] ml-2">{disease.disease_name}</span>
                </h2>

                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(() => {
                      const headingMap = {
                        signs: "Common Signs and Symptoms",
                        primary: "Primary Cause",
                        risk_factor: "Risk Factors",
                      };

                      const grouped = disease.understandings.reduce((acc, understanding) => {
                        if (!acc[understanding.category]) {
                          acc[understanding.category] = [];
                        }
                        acc[understanding.category].push(understanding.content);
                        return acc;
                      }, {});

                      return Object.entries(grouped).map(([category, contents]) => (
                        <div
                          key={category}
                          className="rounded-xl border border-[#207755] overflow-hidden transition-all duration-300 hover:bg-[#E6F5F0] cursor-pointer"
                        >
                          <div className="relative bg-[#207755] text-white font-semibold text-sm px-5 py-3">
                            {headingMap[category] || category}
                            <div className="absolute left-6 -bottom-[6px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#207755]"></div>
                          </div>
                          <ul className="p-4 space-y-3 text-gray-700 text-sm">
                            {contents.map((content, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#207755] font-bold leading-4">•</span>
                                <span className="flex-1 text-[#207755] font-semibold leading-snug">{content}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ));
                    })()}
                  </div>

                  <div className="flex-shrink-0 lg:w-80 flex items-center justify-center">
                    <img
                      src="/100percent.png"
                      alt="100% Satisfaction Guarantee"
                      className="w-full max-w-sm lg:max-w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </section>
            )}

            <section className="w-full bg-[#E4F4E8] mt-4 py-10 px-4 md:px-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {disease.why_choose_banner && (
                  <div className="w-full md:w-[340px]">
                    <img
                      src={`data:image/jpeg;base64,${disease.why_choose_banner}`}
                      alt="Why Choose Banner"
                      className="w-full h-[340px] object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#207755] mb-4">
                    Why Choose Homeopathy for <span className="font-normal">{diseaseName}</span> ?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    {disease.why_choose_items?.map(item => (
                      <div key={item.id}>
                        <h3 className="text-lg font-semibold text-[#207755] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10 px-4 md:px-6">
              <h2 className="text-3xl text-center font-bold text-[#207755] mb-2">
                Patient's <span className="text-[#207755] font-normal">Case Studies</span>
              </h2>

              <div className="space-y-4">
                {disease.case_studies?.map((study) => (
                  <div key={study.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-2/5 bg-gray-50 p-8 flex flex-col justify-center">
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-3">
                              <img
                                src={`data:image/jpeg;base64,${study.before_image || study.image}`}
                                alt="Before Treatment"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>

                          {study.after_image && (
                            <div className="text-center">
                              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
                                <img
                                  src={`data:image/jpeg;base64,${study.after_image}`}
                                  alt="After Treatment"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="text-gray-700 font-medium">After Treatment</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="md:w-3/5 p-8 overflow-y-auto">
                        <div className="border-b border-gray-200">
                          <button
                            onClick={() => toggleAccordion(study.id, 'why-choose')}
                            className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-emerald-600">
                              Why Choose Our Approach?
                            </h3>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-500 transition-transform ${isOpen(study.id, 'why-choose') ? 'transform rotate-180' : ''}`}
                            />
                          </button>
                          {isOpen(study.id, 'why-choose') && (
                            <div className="pb-4 text-gray-700">
                              <p>{study.why_choose_approach}</p>
                            </div>
                          )}
                        </div>
                        <div className="border-b border-gray-200">
                          <button
                            onClick={() => toggleAccordion(study.id, 'what-to-expect')}
                            className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-emerald-600">
                              What to Expect from Treatment?
                            </h3>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-500 transition-transform ${isOpen(study.id, 'what-to-expect') ? 'transform rotate-180' : ''}`}
                            />
                          </button>
                          {isOpen(study.id, 'what-to-expect') && (
                            <div className="pb-4 text-gray-700">
                              <p>{study.what_to_expect}</p>
                            </div>
                          )}
                        </div>

                        <div className="border-b border-gray-200">
                          <button
                            onClick={() => toggleAccordion(study.id, 'timeline')}
                            className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-emerald-600">
                              Timeline
                            </h3>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-500 transition-transform ${isOpen(study.id, 'timeline') ? 'transform rotate-180' : ''}`}
                            />
                          </button>
                          {isOpen(study.id, 'timeline') && (
                            <div className="pb-4 text-gray-700">
                              <p>{study.timeline}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* FAQs Section - Common for both types */}
        {disease.accordions && disease.accordions.length > 0 && (
          <section className="w-full bg-[#7FB19C] py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                <span className="font-normal">Frequently</span> Asked Questions
              </h2>

              <div className="space-y-4">
                {disease.accordions.map((accordion, index) => (
                  <div key={accordion.id} className="bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-base md:text-lg font-semibold text-[#207755] pr-4">
                        {accordion.title}
                      </h3>
                      {openFaqIndex === index ? (
                        <X className="w-5 h-5 text-[#207755] flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#207755] flex-shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 pb-4 text-gray-700 text-sm md:text-base leading-relaxed">
                        {accordion.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Comprehensive Plan Section - Common for both types */}
      <section className='px-10 py-10 relative w-full' style={{
        backgroundImage: "url('/contact.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="flex-[0_0_100%] lg:flex-[0_0_40%] lg:max-w-[40%]">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100">
              <div className="bg-gradient-to-r from-[#207755] via-emerald-600 to-teal-600 p-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                <h2 className="text-lg font-bold text-white text-center relative z-10">
                  Comprehensive Plan
                </h2>
                <p className="text-emerald-50 text-center text-xs mt-0.5 relative z-10">Personalized treatment journey</p>
              </div>

              <div className="p-3 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-2.5 border border-emerald-200">
                    <label className="text-xs font-semibold text-[#207755] mb-1.5 flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-[#207755] rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                      Primary Disease
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-300">
                      <Check className="w-4 h-4 text-[#207755] flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-800">{primaryDisease || 'Loading...'}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-2.5 border border-teal-200">
                    <label className="text-xs font-semibold text-[#207755] mb-1.5 flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                      Additional Conditions
                    </label>
                    <div className="relative">
                      <div
                        className="bg-white border border-teal-200 rounded-lg p-2 cursor-pointer hover:border-teal-600 transition-all min-h-[2rem]"
                        onClick={() => setShowSecondaryDropdown(!showSecondaryDropdown)}
                      >
                        {secondaryDiseases.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {secondaryDiseases.map(disease => (
                              <span
                                key={disease}
                                className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
                              >
                                {disease.length > 12 ? disease.substring(0, 12) + '...' : disease}
                                <X
                                  className="w-3 h-3 cursor-pointer hover:bg-white hover:text-teal-600 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSecondaryDisease(disease);
                                  }}
                                />
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">Optional</span>
                        )}
                      </div>
                      {showSecondaryDropdown && (
                        <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-2xl border border-teal-200 max-h-48 overflow-hidden">

                          {/* Search Header */}
                          <div className="p-2 border-b border-teal-100 sticky top-0 bg-white">
                            <div className="relative">
                              <Search className="absolute left-2 top-2 w-3 h-3 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-200 rounded focus:border-teal-600 outline-none"
                                value={secondarySearch}
                                onChange={(e) => setSecondarySearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>

                          {/* List */}
                          <div className="overflow-y-auto max-h-36">
                            {filteredSecondaryDiseases.map((disease) => (
                              <div
                                key={disease}
                                className="px-3 py-1.5 text-xs hover:bg-teal-50 cursor-pointer flex items-center gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSecondaryDisease(disease);
                                }}
                              >
                                {/* ✅ FIXED CHECKBOX */}
                                <div
                                  className={`w-3 h-3 rounded border flex items-center justify-center 
              ${secondaryDiseases.includes(disease)
                                      ? 'bg-teal-600 border-teal-600'
                                      : 'border-gray-300'
                                    }`}
                                >
                                  {secondaryDiseases.includes(disease) && (
                                    <Check className="w-2 h-2 text-white" />
                                  )}
                                </div>

                                {disease}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-2.5 border border-emerald-200">
                    <label className="text-xs font-semibold text-[#207755] mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Region
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRegion}
                        onChange={(e) => {
                          setSelectedRegion(e.target.value);
                          setSelectedTerm('');
                        }}
                        disabled={availableRegions.length === 0}
                        className="w-full bg-white border border-emerald-200 rounded-lg p-2 text-xs text-gray-800 cursor-pointer hover:border-[#207755] transition-all appearance-none focus:outline-none focus:border-[#207755] focus:ring-1 focus:ring-[#207755] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">{availableRegions.length > 0 ? 'Select region' : (primaryDisease ? 'None available' : 'Select disease first')}</option>
                        {availableRegions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#207755] pointer-events-none" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-2.5 border border-teal-200">
                    <label className="text-xs font-semibold text-[#207755] mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Duration
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                        disabled={availableTerms.length === 0}
                        className="w-full bg-white border border-teal-200 rounded-lg p-2 text-xs text-gray-800 cursor-pointer hover:border-teal-600 transition-all appearance-none focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">{availableTerms.length > 0 ? 'Select duration' : (selectedRegion ? 'None available' : 'Select region first')}</option>
                        {availableTerms.map(term => (
                          <option key={term.months} value={term.months}>
                            {term.months} months - {term.currency} {term.price}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-2.5 border border-emerald-200">
                  <label className="text-xs font-semibold text-[#207755] mb-1.5 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    Payment
                  </label>
                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-white border border-emerald-200 rounded-lg p-2 text-xs text-gray-800 cursor-pointer hover:border-[#207755] transition-all appearance-none focus:outline-none focus:border-[#207755] focus:ring-1 focus:ring-[#207755]"
                    >
                      <option value="">Select payment method</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="UPI">UPI</option>
                      <option value="Net Banking">Net Banking</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#207755] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-gray-100 flex justify-center items-center">
                <button
                  className="rounded-full bg-[#147140] hover:from-emerald-700 hover:via-teal-700 hover:to-[#207755] text-white font-normal py-2 sm:py-2.5 md:py-3 px-6 sm:px-8 md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-xs sm:text-sm md:text-base"
                  onClick={handleStartTreatment}
                >
                  Start Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  )
}
export default Banner;