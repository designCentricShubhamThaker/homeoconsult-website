import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../Layout/Layout.jsx';
import { useNavigate } from 'react-router-dom';

const CURED_CASE_DISEASES = [
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

const AllTestimonials = () => {
  const [selectedDisease, setSelectedDisease] = useState(CURED_CASE_DISEASES[0]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const PACKAGES_CACHE_KEY = 'packages_cache';
  const PACKAGES_CACHE_TIMESTAMP_KEY = 'packages_cache_timestamp';

  const CACHE_DURATION = 30 * 60 * 1000;

  const wsRef = useRef(null);
  const autoPlayRef = useRef(null);
  const tabsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  const [packages, setPackages] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableTerms, setAvailableTerms] = useState([]);
  const [priceInfo, setPriceInfo] = useState(null);
  const selectedDiseaseRef = useRef(selectedDisease);

  const navigate = useNavigate();

  // Constants
  const WS_URL = 'ws://localhost:8000/testimonials/ws';
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;
  const POLLING_INTERVAL = 5000;

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    selectedDiseaseRef.current = selectedDisease;
    console.log('📌 Updated selectedDiseaseRef to:', selectedDisease);
  }, [selectedDisease]);

 const fetchPackages = async () => {
  try {
    console.log('🔄 Fetching fresh packages from server...');
    const response = await fetch('http://localhost:8000/packages', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setPackages(data);
  } catch (error) {
    console.error('❌ Error fetching packages:', error);
    // Keep existing packages on error
    if (packages.length === 0) {
      setPackages([]);
    }
  }
};

  const toggleDisease = (disease) => {
    if (selectedDiseases.includes(disease)) {
      setSelectedDiseases(selectedDiseases.filter(d => d !== disease));
    } else {
      setSelectedDiseases([...selectedDiseases, disease]);
    }
  };

  const handleStartTreatment = () => {
    if (selectedDiseases.length === 0) {
      alert('Please select at least one disease');
      return;
    }
    if (!selectedRegion || !selectedTerm || !paymentMethod) {
      alert('Please complete all required fields before starting treatment');
      return;
    }

    const treatmentData = {
      primaryDisease: selectedDiseases[0],
      secondaryDiseases: selectedDiseases.slice(1),
      region: selectedRegion,
      term: selectedTerm,
      priceInfo,
      paymentMethod
    };

    navigate('/services/comprehensive-plan', {
      state: { treatmentData }
    });
  };

  // WebSocket connection with reconnection logic
  const connectWebSocket = () => {
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log('⚠️ Max reconnection attempts reached, using polling only');
      setConnectionStatus('polling');
      fallbackToPolling();
      return;
    }

    try {
      console.log(`🔌 WebSocket connection attempt ${reconnectAttemptsRef.current + 1}/${MAX_RECONNECT_ATTEMPTS}...`);
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('✅ WebSocket Connected');
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0;

        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
          console.log('🛑 Stopped polling - WebSocket active');
        }
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('📨 WebSocket message:', message);

          if (['create', 'update', 'delete'].includes(message.type)) {
            console.log(`🔄 Refreshing testimonials due to: ${message.type}`);
            console.log('📍 Message disease:', message.disease_name);
            console.log('📍 Selected disease (from REF):', selectedDiseaseRef.current);

            const currentSelectedDisease = selectedDiseaseRef.current;
            const shouldRefresh = !currentSelectedDisease || message.disease_name === currentSelectedDisease;

            console.log('🤔 Should refresh?', shouldRefresh);

            if (shouldRefresh) {
              console.log('✅ Fetching testimonials for:', currentSelectedDisease);
              fetchTestimonialsByDisease(currentSelectedDisease);
            } else {
              console.log(`⏭️ Skipping refresh - viewing "${currentSelectedDisease}", update was for "${message.disease_name}"`);
            }
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setConnectionStatus('error');
      };

      ws.onclose = (event) => {
        console.log(`🔌 WebSocket disconnected: Code ${event.code}`);
        setConnectionStatus('disconnected');

        wsRef.current = null;
        reconnectAttemptsRef.current++;

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`🔄 Attempting to reconnect...`);
            connectWebSocket();
          }, RECONNECT_DELAY);
        } else {
          setConnectionStatus('polling');
        }

        fallbackToPolling();
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('❌ Failed to create WebSocket:', error);
      setConnectionStatus('error');
      reconnectAttemptsRef.current++;
      fallbackToPolling();
    }
  };

  const fallbackToPolling = () => {
    if (!pollingIntervalRef.current) {
      console.log('📡 Starting polling fallback...');
      setConnectionStatus('polling');

      pollingIntervalRef.current = setInterval(() => {
        if (selectedDisease) {
          fetchTestimonialsByDisease(selectedDisease);
        }
      }, POLLING_INTERVAL);
    }
  };

  // Initialize WebSocket on mount
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedDisease) {
      fetchTestimonialsByDisease(selectedDisease);
    }
  }, [selectedDisease]);

  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials, currentIndex]);

  useEffect(() => {
    if (tabsRef.current) {
      const selectedTab = tabsRef.current.querySelector('[data-selected="true"]');
      if (selectedTab) {
        selectedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDisease]);

  useEffect(() => {
    if (selectedDiseases.length > 0 && packages.length > 0) {
      filterPackagesForSelectedDiseases();
    } else {
      setAvailableRegions([]);
      setAvailableTerms([]);
      setPriceInfo(null);
    }
  }, [selectedDiseases, packages]);

  useEffect(() => {
    if (selectedRegion && selectedDiseases.length > 0) {
      filterTermsForRegion();
    } else {
      setAvailableTerms([]);
      setPriceInfo(null);
    }
  }, [selectedRegion, selectedDiseases, packages]);

  useEffect(() => {
    if (selectedTerm && selectedRegion && selectedDiseases.length > 0) {
      calculatePrice();
    } else {
      setPriceInfo(null);
    }
  }, [selectedTerm, selectedRegion, selectedDiseases, packages]);

  const filterPackagesForSelectedDiseases = () => {
    if (selectedDiseases.length === 0) {
      setAvailableRegions([]);
      return;
    }

    const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");

    if (!comprehensivePlan || !comprehensivePlan.regions) {
      setAvailableRegions([]);
      return;
    }

    const matchingRegions = comprehensivePlan.regions.filter(r =>
      selectedDiseases.includes(r.disease)
    );

    const regions = [...new Set(matchingRegions.map(r => r.location))];
    setAvailableRegions(regions);

    console.log('Available regions for diseases:', regions);
  };

  const filterTermsForRegion = () => {
    if (!selectedRegion || selectedDiseases.length === 0) {
      setAvailableTerms([]);
      return;
    }

    const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");

    if (!comprehensivePlan || !comprehensivePlan.regions) {
      setAvailableTerms([]);
      return;
    }

    const primaryDisease = selectedDiseases[0];
    const regionData = comprehensivePlan.regions.find(
      r => r.disease === primaryDisease && r.location === selectedRegion
    );

    if (!regionData) {
      setAvailableTerms([]);
      return;
    }

    const terms = regionData.duration_months.map((months, idx) => ({
      months,
      price: regionData.prices[idx],
      currency: regionData.currency
    }));

    setAvailableTerms(terms);
    console.log('Available terms for region:', terms);
  };

  const calculatePrice = () => {
    if (!selectedTerm || !selectedRegion || selectedDiseases.length === 0) {
      setPriceInfo(null);
      return;
    }

    const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");

    if (!comprehensivePlan || !comprehensivePlan.regions) {
      setPriceInfo(null);
      return;
    }

    let totalPrice = 0;
    let currency = '';

    selectedDiseases.forEach(disease => {
      const regionData = comprehensivePlan.regions.find(
        r => r.disease === disease && r.location === selectedRegion
      );

      if (regionData) {
        const termIndex = regionData.duration_months.findIndex(
          m => m === parseInt(selectedTerm)
        );

        if (termIndex !== -1) {
          totalPrice += regionData.prices[termIndex];
          currency = regionData.currency;
        }
      }
    });

    setPriceInfo({
      totalPrice,
      currency,
      diseaseCount: selectedDiseases.length
    });

    console.log('Calculated price:', { totalPrice, currency });
  };

 const fetchTestimonialsByDisease = async (disease) => {
  console.log('🔄 AllTestimonials: Fetching for:', disease);

  try {
    console.log('🔄 AllTestimonials: Fetching fresh from server...');
    const response = await fetch('http://localhost:8000/testimonials', {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allTestimonials = await response.json();

    if (!Array.isArray(allTestimonials)) {
      console.error('❌ Invalid data format, expected array');
      setTestimonials([]);
      setCurrentIndex(0);
      return;
    }

    // Filter by selected disease
    const filteredTestimonials = allTestimonials.filter(t => t.disease_name === disease);
    console.log('📦 AllTestimonials: Filtered for', disease, ':', filteredTestimonials.length);

    setTestimonials(filteredTestimonials);

    if (filteredTestimonials.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= filteredTestimonials.length) {
      setCurrentIndex(0);
    }

  } catch (error) {
    console.error('❌ AllTestimonials Error:', error);
    // Keep existing testimonials on error
    if (testimonials.length === 0) {
      setTestimonials([]);
      setCurrentIndex(0);
    }
  }
};



  const handleNext = () => {
    if (testimonials.length === 0) return;

    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <Layout>
      <div className=" bg-gradient-to-br from-gray-50 via-white to-emerald-50">
        {/* Header with Disease Tabs */}
        <div className=" sticky top-0 z-10">
          <div className="mx-auto px-3 sm:px-4 lg:px-6">
            <div className="py-2">
              <div className="block sm:hidden px-2">
                <select
                  value={selectedDisease}
                  onChange={(e) => {
                    setSelectedDisease(e.target.value);
                    setIsAutoPlaying(true);
                  }}
                  className="w-full px-4 py-3 border-2 border-emerald-500 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                >
                  {CURED_CASE_DISEASES.map((disease) => (
                    <option key={disease} value={disease}>
                      {disease}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop/Tablet: Wrapped tabs */}
              {/* <div ref={tabsRef} className="hidden sm:block px-3 sm:px-4 lg:px-4">
                <div className="flex flex-wrap justify-center gap-2 pb-2">
                  {CURED_CASE_DISEASES.map((disease) => (
                    <button
                      key={disease}
                      data-selected={selectedDisease === disease}
                      onClick={() => {
                        setSelectedDisease(disease);
                        setIsAutoPlaying(true);
                      }}
                      className={`
                        px-3 py-2 rounded-lg text-xs
                        transition-all duration-200
                        ${selectedDisease === disease
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-200 scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                        }
                      `}
                    >
                      {disease}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>



    
        <div className="w-full  bg-gray-50 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
         
            <div className="w-full max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Side - Disease List */}
                  <div className="lg:col-span-3 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <div className="p-3 sm:p-4 md:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-emerald-700 mb-3 sm:mb-4">
                        Diseases
                      </h3>

                      {/* Horizontal scroll on mobile, vertical on desktop */}
                      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0 no-scrollbar">
                        {CURED_CASE_DISEASES.map((disease) => (
                          <button
                            key={disease}
                            onClick={() => {
                              setSelectedDisease(disease);
                              setCurrentIndex(0);
                            }}
                            className={`
                      flex-shrink-0 lg:flex-shrink lg:w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap lg:whitespace-normal
                      ${selectedDisease === disease
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'text-gray-700 hover:bg-gray-100 bg-white lg:bg-transparent border lg:border-0 border-gray-200'
                              }
                    `}
                          >
                            {disease}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Testimonials List */}
                  <div className="lg:col-span-9 p-4 sm:p-6 md:p-8">
                    {testimonials.length === 0 ? (
                      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                        <div className="text-center px-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </div>
                          <p className="text-gray-600 text-base sm:text-lg font-medium">No testimonials available</p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">for {selectedDisease}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#207755] mb-4 sm:mb-6">
                          {selectedDisease}
                        </h2>

                        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                          {testimonials.map((testimonial) => (
                            <div
                              key={testimonial.id}
                              className="bg-white rounded border border-gray-200 p-3 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                  <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-emerald-500"
                                    style={{
                                      backgroundColor: testimonial.patient_name
                                        ? `hsl(${(testimonial.patient_name.charCodeAt(0) * 137.5) % 360}, 70%, 85%)`
                                        : 'hsl(200, 70%, 85%)'
                                    }}
                                  >
                                    <span className="text-white font-bold text-lg">
                                      {testimonial.patient_name ? testimonial.patient_name.charAt(0).toUpperCase() : '?'}
                                    </span>
                                  </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline gap-2 mb-1">
                                    <h3 className="font-semibold text-gray-800 text-sm truncate">
                                      {testimonial.patient_name}
                                    </h3>
                                    {testimonial.case_id && (
                                      <span className="text-xs text-emerald-600 whitespace-nowrap">
                                        #{testimonial.case_id}
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-xs text-gray-500 mb-1.5">{testimonial.branch}</p>

                                  <p className="text-sm text-gray-700 leading-snug line-clamp-2">
                                    {testimonial.brief}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="bg-gray-100 py-6 sm:py-8 md:py-12 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#207755] mb-2">
                Comprehensive <span className="font-normal">Plan</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Side - Disease Selection */}
                <div className="bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 lg:border-r border-gray-300">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-emerald-700 mb-3 sm:mb-4 md:mb-6">
                    Select Ailments
                  </h3>

                  <div className="h-64 sm:h-80 md:h-96 lg:h-[450px] overflow-y-auto pr-2 custom-scrollbar space-y-1">
                    {CURED_CASE_DISEASES.map((disease) => (
                      <label
                        key={disease}
                        className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedDiseases.includes(disease)}
                          onChange={() => toggleDisease(disease)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer flex-shrink-0"
                        />
                        <span className="text-xs sm:text-sm text-gray-700 select-none">{disease}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-white">
                  <div className="h-full flex flex-col justify-center">
                    {/* Form Fields */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-6">
                      {/* Country/Region */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-emerald-700 mb-1.5 sm:mb-2">
                          Select Country/Region:
                        </label>
                        <select
                          value={selectedRegion}
                          onChange={(e) => {
                            setSelectedRegion(e.target.value);
                            setSelectedTerm('');
                          }}
                          disabled={availableRegions.length === 0}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 text-xs sm:text-sm"
                        >
                          <option value="">
                            {availableRegions.length > 0
                              ? 'Select region'
                              : (selectedDiseases.length > 0 ? 'No regions available' : 'Select diseases first')}
                          </option>
                          {availableRegions.map((region) => (
                            <option key={region} value={region}>
                              {region}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Term */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-emerald-700 mb-1.5 sm:mb-2">
                          Select A Term:
                        </label>
                        <select
                          value={selectedTerm}
                          onChange={(e) => setSelectedTerm(e.target.value)}
                          disabled={availableTerms.length === 0}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 text-xs sm:text-sm"
                        >
                          <option value="">
                            {availableTerms.length > 0
                              ? 'Select duration'
                              : (selectedRegion ? 'No terms available' : 'Select region first')}
                          </option>
                          {availableTerms.map((term) => (
                            <option key={term.months} value={term.months}>
                              {term.months} months - {term.currency} {term.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-emerald-700 mb-1.5 sm:mb-2">
                          Payment Methods:
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 text-xs sm:text-sm"
                        >
                          <option value="">Select payment method</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                          <option value="UPI">UPI</option>
                          <option value="Net Banking">Net Banking</option>
                        </select>
                      </div>

                      {/* reCAPTCHA */}
                      <div>
                        <div className="w-full border border-gray-300 rounded-md p-2 sm:p-3 bg-gray-50 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="recaptcha"
                              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer flex-shrink-0"
                            />
                            <label htmlFor="recaptcha" className="text-xs sm:text-sm text-gray-700 cursor-pointer select-none">
                              I'm not a robot
                            </label>
                          </div>
                          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center pt-2 sm:pt-4">
                        <button
                          onClick={handleStartTreatment}
                          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-8 sm:px-12 md:px-16 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                        >
                          Start Treatment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-4 text-gray-700">Loading packages...</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #10b981;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #059669;
    }
  `}</style>
    </Layout>
  );
};

export default AllTestimonials;