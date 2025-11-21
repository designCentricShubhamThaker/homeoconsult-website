import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, X, Check, MapPin, Calendar, CreditCard } from 'lucide-react';

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

export default function DiseaseTreatmentSection({ disease }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

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


  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('https://lacey-flocculable-sherice.ngrok-free.dev/packages');
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
        setPrimaryDisease(disease.disease_name);
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
        console.log(regionData, 'regionData');
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
    if (disease?.disease_name) {
      setPrimaryDisease(disease.disease_name);
      setSecondaryDiseases([]);
      setSelectedRegion('');
      setSelectedTerm('');
      setPaymentMethod('');
      setPriceInfo(null);
    }
  }, [disease?.disease_name]);



  useEffect(() => {
    if (selectedTerm && availableTerms.length > 0) {
      const termInfo = availableTerms.find(t => t.months === parseInt(selectedTerm));
      setPriceInfo(termInfo);
    }
  }, [selectedTerm, availableTerms]);

  const toggleSecondaryDisease = (disease) => {
    if (secondaryDiseases.includes(disease)) {
      setSecondaryDiseases(secondaryDiseases.filter(d => d !== disease));
    } else {
      setSecondaryDiseases([...secondaryDiseases, disease]);
    }
  };

  const filteredSecondaryDiseases = DISEASES.filter(d =>
    d !== primaryDisease &&
    d.toLowerCase().includes(secondarySearch.toLowerCase())
  );

  const handleStartTreatment = () => {
    const data = {
      primaryDisease,
      secondaryDiseases,
      region: selectedRegion,
      term: selectedTerm,
      price: priceInfo,
      paymentMethod
    };
    console.log('Treatment Plan:', data);
    alert('Treatment plan submitted! Check console for details.');
  };

  return (
    <section className="px-4 md:px-6 ">
      <div className="flex flex-col lg:flex-row gap-6  mx-auto">
       
        <div className="flex-[0_0_100%] lg:flex-[0_0_60%] p-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-[#207755] font-bold">Homeopathy Treatment</span>{' '}
            <span className="text-[#207755] font-normal">For {disease?.disease_name}</span>
          </h2>

          <div className="mt-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#207755] mb-3">
              What is <span className="text-[#207755] font-normal">{disease?.disease_name}</span>?
            </h3>
            <div className="prose max-w-none text-gray-700 leading-relaxed text-xs md:text-base">
              {disease?.what_is_content}
            </div>
            {/* {disease?.additional_info && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700 text-sm md:text-base">{disease.additional_info}</p>
              </div>
            )} */}
          </div>
        </div>

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
                        <div className="overflow-y-auto max-h-36">
                          {filteredSecondaryDiseases.map(disease => (
                            <div
                              key={disease}
                              className="px-3 py-1.5 text-xs hover:bg-teal-50 cursor-pointer flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSecondaryDisease(disease);
                              }}
                            >
                              <div className={`w-3 h-3 rounded border flex items-center justify-center ${secondaryDiseases.includes(disease) ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                                {secondaryDiseases.includes(disease) && <Check className="w-2 h-2 text-white" />}
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
                {/* Region Selection */}
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

            <div className="p-3 border-t border-gray-100">
              <button
                className="w-full bg-gradient-to-r from-[#207755] via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-teal-700 hover:to-[#207755] text-white font-bold py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-xs"
                onClick={handleStartTreatment}
              >
                Start Your Treatment Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}