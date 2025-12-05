import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Layout from '../Layout/Layout.jsx';
import { useNavigate } from 'react-router-dom';

const DISEASES = [
  "Alopecia areata & Hair Fall", "Chalazion & Stys", "Eczema & Atopic Dermatitis",
  "Ganglion cyst", "Ingrown Nail", "Kidney stones or Renal Calculi",
  "Lichen Planus", "Leg Ulcers", "Molluscum Contagiosum", "Melasma",
  "Psoriasis", "Skin Allergies or Urticaria", "Tonsils", "Vitiligo or Leucoderma",
  "Vasculitis", "Warts & Corns"
];

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

const CuredCasesGallery = () => {
  const [selectedDisease, setSelectedDisease] = useState(DISEASES[0]);
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSliderAutoPlaying, setIsSliderAutoPlaying] = useState(true);
  const sliderAutoPlayRef = useRef(null);
  const selectedDiseaseRef = useRef(selectedDisease);

  const navigate = useNavigate();

  // Constants
  const WS_URL = 'ws://localhost:8000/cured-cases/ws';
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
      console.error('Error fetching packages:', error);
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
      primaryDisease: selectedDiseases[0],  // First disease is primary
      secondaryDiseases: selectedDiseases.slice(1),  // Rest are secondary
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

      // ⭐ UPDATED onmessage handler
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('📨 WebSocket message:', message);

          if (['new_cured_case', 'deleted_cured_case', 'updated_cured_case'].includes(message.type)) {
            console.log(`🔄 Refreshing cases due to: ${message.type}`);
            console.log('📍 Message disease:', message.data.disease);
            console.log('📍 Selected disease (from REF):', selectedDiseaseRef.current);

            // Use the ref value to get the current selected disease
            const currentSelectedDisease = selectedDiseaseRef.current;
            const shouldRefresh = !currentSelectedDisease || message.data.disease === currentSelectedDisease;

            console.log('🤔 Should refresh?', shouldRefresh);

            if (shouldRefresh) {
              console.log('✅ Fetching cases for:', currentSelectedDisease);
              fetchCasesByDisease(currentSelectedDisease);
            } else {
              console.log(`⏭️ Skipping refresh - viewing "${currentSelectedDisease}", update was for "${message.data.disease}"`);
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
          fetchCasesByDisease(selectedDisease);
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
      fetchCasesByDisease(selectedDisease);
    }
  }, [selectedDisease]);

  useEffect(() => {
    if (isAutoPlaying && cases.length > 0) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, cases, currentCaseIndex, currentPairIndex]);

  useEffect(() => {
    if (tabsRef.current) {
      const selectedTab = tabsRef.current.querySelector('[data-selected="true"]');
      if (selectedTab) {
        selectedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDisease]);


  // Add this useEffect after the existing useEffects
  useEffect(() => {
    if (selectedDiseases.length > 0 && packages.length > 0) {
      filterPackagesForSelectedDiseases();
    } else {
      setAvailableRegions([]);
      setAvailableTerms([]);
      setPriceInfo(null);
    }
  }, [selectedDiseases, packages]);

  // Add this useEffect for when region is selected
  useEffect(() => {
    if (selectedRegion && selectedDiseases.length > 0) {
      filterTermsForRegion();
    } else {
      setAvailableTerms([]);
      setPriceInfo(null);
    }
  }, [selectedRegion, selectedDiseases, packages]);

  // Add this useEffect for when term is selected
  useEffect(() => {
    if (selectedTerm && selectedRegion && selectedDiseases.length > 0) {
      calculatePrice();
    } else {
      setPriceInfo(null);
    }
  }, [selectedTerm, selectedRegion, selectedDiseases, packages]);

  const getAllSlides = () => {
    const slides = [];
    cases.forEach((caseItem) => {
      caseItem.image_pairs.forEach((pair, pairIdx) => {
        slides.push({
          ...pair,
          caseId: caseItem.id,
          patientName: caseItem.patient_name,
          caseRef: caseItem.case_ref,
          branch: caseItem.branch,
          brief: caseItem.brief,
          pairIndex: pairIdx
        });
      });
    });
    return slides;
  };

  // Add this useEffect for auto-sliding
  useEffect(() => {
    if (isSliderAutoPlaying && cases.length > 0) {
      const allSlides = getAllSlides();

      sliderAutoPlayRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev >= allSlides.length - 1) {
            return 0; // Loop back to start
          }
          return prev + 1;
        });
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (sliderAutoPlayRef.current) {
        clearInterval(sliderAutoPlayRef.current);
      }
    };
  }, [isSliderAutoPlaying, cases]);

  // Add manual navigation handlers
  const handlePreviousSlide = () => {
    setIsSliderAutoPlaying(false);
    const allSlides = getAllSlides();
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : allSlides.length - 1));
  };

  const handleNextSlide = () => {
    setIsSliderAutoPlaying(false);
    const allSlides = getAllSlides();
    setCurrentSlideIndex((prev) => (prev < allSlides.length - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (index) => {
    setIsSliderAutoPlaying(false);
    setCurrentSlideIndex(index);
  };


  // Replace the filterPackagesForSelectedDiseases function
  const filterPackagesForSelectedDiseases = () => {
    if (selectedDiseases.length === 0) {
      setAvailableRegions([]);
      return;
    }

    // Find the Comprehensive plan package (same as Treatment Selector)
    const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");

    if (!comprehensivePlan || !comprehensivePlan.regions) {
      setAvailableRegions([]);
      return;
    }

    // Get all regions that match ANY of the selected diseases
    const matchingRegions = comprehensivePlan.regions.filter(r =>
      selectedDiseases.includes(r.disease)
    );

    // Extract unique locations
    const regions = [...new Set(matchingRegions.map(r => r.location))];
    setAvailableRegions(regions);

    console.log('Available regions for diseases:', regions);
  };

  // Replace the filterTermsForRegion function
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

    // Find the region data for the PRIMARY disease (first selected disease)
    const primaryDisease = selectedDiseases[0];
    const regionData = comprehensivePlan.regions.find(
      r => r.disease === primaryDisease && r.location === selectedRegion
    );

    if (!regionData) {
      setAvailableTerms([]);
      return;
    }

    // Map the duration_months array to term objects
    const terms = regionData.duration_months.map((months, idx) => ({
      months,
      price: regionData.prices[idx],
      currency: regionData.currency
    }));

    setAvailableTerms(terms);
    console.log('Available terms for region:', terms);
  };

  // Replace the calculatePrice function
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

    // Calculate price for each selected disease
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

  const fetchCasesByDisease = async (disease) => {
    console.log('🔄 Fetching cases for:', disease);

    // Don't show loading spinner for WebSocket updates (only for manual navigation)
    const isWebSocketUpdate = cases.length > 0;
    if (!isWebSocketUpdate) {
      setLoading(true);
    }

    try {
      const response = await fetch(
        `http://localhost:8000/cured-cases/disease/${encodeURIComponent(disease)}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('📦 Cases received:', data.cases?.length);

        const newCases = data.cases || [];

        // Update cases state
        setCases(newCases);

        // Reset carousel position if needed
        if (newCases.length === 0) {
          setCurrentCaseIndex(0);
          setCurrentPairIndex(0);
        } else {
          // Check if current indices are still valid
          if (currentCaseIndex >= newCases.length) {
            setCurrentCaseIndex(0);
            setCurrentPairIndex(0);
          } else if (currentPairIndex >= newCases[currentCaseIndex]?.image_pairs?.length) {
            // If current pair index is invalid, go to the last pair of current case
            setCurrentPairIndex(Math.max(0, newCases[currentCaseIndex].image_pairs.length - 1));
          }
        }

        if (connectionStatus === 'error' && !wsRef.current) {
          setConnectionStatus('polling');
        }

        console.log('✅ Cases updated successfully');
      } else {
        console.error('❌ Error response:', response.status);
        setCases([]);
        setCurrentCaseIndex(0);
        setCurrentPairIndex(0);
      }
    } catch (error) {
      console.error('❌ Error fetching cases:', error);
      setCases([]);
      setCurrentCaseIndex(0);
      setCurrentPairIndex(0);

      if (connectionStatus !== 'connected' && connectionStatus !== 'polling') {
        setConnectionStatus('error');
      }
    } finally {
      setLoading(false);
    }
  };



  const handlePrevious = () => {
    setIsAutoPlaying(false);

    if (currentPairIndex > 0) {
      setCurrentPairIndex(currentPairIndex - 1);
    } else if (currentCaseIndex > 0) {
      setCurrentCaseIndex(currentCaseIndex - 1);
      setCurrentPairIndex(cases[currentCaseIndex - 1].image_pairs.length - 1);
    } else {
      setCurrentCaseIndex(cases.length - 1);
      setCurrentPairIndex(cases[cases.length - 1].image_pairs.length - 1);
    }
  };

  const handleNext = () => {
    if (cases.length === 0) return;

    const currentCase = cases[currentCaseIndex];

    if (currentPairIndex < currentCase.image_pairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
      setCurrentPairIndex(0);
    } else {
      setCurrentCaseIndex(0);
      setCurrentPairIndex(0);
    }
  };

  const currentCase = cases[currentCaseIndex];
  const currentPair = currentCase?.image_pairs[currentPairIndex];

  return (
    <Layout>
      <div className=" bg-gradient-to-br from-gray-50 via-white to-emerald-50">

        <div className="w-full bg-gray-50 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <div className="animate-spin w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
              <p className="text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium">Loading cases...</p>
            </div>
          ) : (
            <div className="w-full max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-3 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <div className="p-3 sm:p-4 md:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-emerald-700 mb-3 sm:mb-4">
                        Diseases
                      </h3>

                      {/* Horizontal scroll on mobile, vertical on desktop */}
                      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0 no-scrollbar">
                        {DISEASES.map((disease) => (
                          <button
                            key={disease}
                            onClick={() => {
                              setSelectedDisease(disease);
                              setCurrentCaseIndex(0);
                              setCurrentPairIndex(0);
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
                  <div className="lg:col-span-9 p-4 sm:p-6 md:p-8">
                    {cases.length === 0 ? (
                      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                        <div className="text-center px-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="text-gray-600 text-base sm:text-lg font-medium">No cases available</p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">for {selectedDisease}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl  text-[#207755] mb-4 sm:mb-6">
                          {selectedDisease}
                        </h2>

                        {/* Slider Container */}
                        <div className="relative">
                          {/* Slides */}
                          <div className="overflow-hidden rounded-lg">
                            <div
                              className="flex transition-transform duration-700 ease-in-out"
                              style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
                            >
                              {getAllSlides().map((slide, idx) => (
                                <div key={idx} className="min-w-full">
                                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 mx-2">
                                    {/* Patient Info Header */}
                                    <div className="mb-6 text-center">
                                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                                        {slide.patientName}
                                      </h3>
                                      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-gray-600">
                                        {slide.caseRef && (
                                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                                            Case Ref # {slide.caseRef}
                                          </span>
                                        )}
                                        <span className="text-gray-500">
                                          {slide.branch}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Before & After Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                      {/* Before */}
                                      <div>
                                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-sm text-center mb-3">
                                          Before Treatment
                                        </div>
                                        <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                                          <img
                                            src={slide.before}
                                            alt="Before treatment"
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      </div>

                                      {/* After */}
                                      <div>
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full font-bold text-sm text-center mb-3">
                                          After Treatment
                                        </div>
                                        <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                                          <img
                                            src={slide.after}
                                            alt="After treatment"
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Brief Description */}
                                    {slide.brief && (
                                      <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                          {slide.brief}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={handlePreviousSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10"
                          >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                          </button>
                          <button
                            onClick={handleNextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10"
                          >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                          </button>
                          <div className="flex justify-center mt-6 gap-2">
                            {getAllSlides().map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                className={`transition-all duration-300 rounded-full ${idx === currentSlideIndex
                                    ? 'w-8 h-2 bg-emerald-600'
                                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                                  }`}
                              />
                            ))}
                          </div> 
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-100 py-8 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-100 py-6 sm:py-8 md:py-12 px-3 sm:px-4">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
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
                    <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-white">
                      <div className="h-full flex flex-col justify-center">
                        <div className="space-y-3 sm:space-y-4 md:space-y-6">
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

export default CuredCasesGallery;