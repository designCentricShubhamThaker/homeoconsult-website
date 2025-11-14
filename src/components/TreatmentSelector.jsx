import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';
import { HiMiniMapPin } from "react-icons/hi2";

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

export default function TreatmentSelector() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [primaryDisease, setPrimaryDisease] = useState('');
  const [secondaryDiseases, setSecondaryDiseases] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [showPrimaryDropdown, setShowPrimaryDropdown] = useState(false);
  const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(false);
  const [primarySearch, setPrimarySearch] = useState('');
  const [secondarySearch, setSecondarySearch] = useState('');

  const [expandedSections, setExpandedSections] = useState({
    primary: false,
    secondary: false,
    region: false,
    term: false,
    payment: false
  });

  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableTerms, setAvailableTerms] = useState([]);
  const [priceInfo, setPriceInfo] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:8000/packages');
      const data = await response.json();
      setPackages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (primaryDisease && packages.length > 0) {
      const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");

      if (comprehensivePlan && comprehensivePlan.regions) {
        const matchingRegions = comprehensivePlan.regions.filter(r => r.disease === primaryDisease);
        const regions = [...new Set(matchingRegions.map(r => r.location))];
        setAvailableRegions(regions);
      }
    }
  }, [primaryDisease, packages]);

  useEffect(() => {
    if (primaryDisease && selectedRegion && packages.length > 0) {
      const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");
      if (comprehensivePlan && comprehensivePlan.regions) {
        const regionData = comprehensivePlan.regions.find(
          r => r.disease === primaryDisease && r.location === selectedRegion
        );

        if (regionData) {
          const terms = regionData.duration_months.map((months, idx) => ({
            months,
            price: regionData.prices[idx],
            currency: regionData.currency
          }));
          setAvailableTerms(terms);
        }
      }
    }
  }, [primaryDisease, selectedRegion, packages]);

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filteredPrimaryDiseases = DISEASES.filter(d =>
    d.toLowerCase().includes(primarySearch.toLowerCase())
  );

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-6 px-4 flex items-center">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          <span className="text-[#207755]">Start Your Treatment</span>{' '}
          <span className="text-gray-600">Today</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-4" style={{ height: '80vh' }}>
          {/* Left Card - Comprehensive Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full">
  <div className="bg-gradient-to-r from-[#207755] to-emerald-600 p-3">
    <h2 className="text-lg font-bold text-white text-center">
      Comprehensive <span className="font-normal">Plan</span>
    </h2>
  </div>

  <div className="p-3 flex-1 flex flex-col">
    <div className="space-y-2 flex-1 overflow-y-auto">
      {/* Primary Disease */}
      <div className="border-b border-gray-100 pb-2">
        <div
          className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-gray-50 rounded"
          onClick={() => toggleSection('primary')}
        >
          <span className="text-sm font-medium text-[#207755]">Select your Primary Disease</span>
          <ChevronDown className={`w-4 h-4 text-[#207755] transition-transform ${expandedSections.primary ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.primary && (
          <div className="relative mt-2">
            <div
              className="bg-gray-50 border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-[#207755] transition-all"
              onClick={() => setShowPrimaryDropdown(!showPrimaryDropdown)}
            >
              <span className={primaryDisease ? 'text-gray-800 text-sm' : 'text-gray-400 text-sm'}>
                {primaryDisease || 'Select primary disease'}
              </span>
            </div>
            {showPrimaryDropdown && (
              <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-48 overflow-hidden">
                <div className="p-2 border-b sticky top-0 bg-white">
                  <div className="relative">
                    <Search className="absolute left-2 top-2 w-3 h-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-7 pr-2 py-1 text-xs border border-gray-200 rounded focus:border-[#207755] outline-none"
                      value={primarySearch}
                      onChange={(e) => setPrimarySearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-40">
                  {filteredPrimaryDiseases.map(disease => (
                    <div
                      key={disease}
                      className={`px-2 py-1.5 text-xs hover:bg-emerald-50 cursor-pointer ${primaryDisease === disease ? 'bg-emerald-50 text-[#207755]' : ''}`}
                      onClick={() => {
                        setPrimaryDisease(disease);
                        setShowPrimaryDropdown(false);
                        setPrimarySearch('');
                        setSelectedRegion('');
                        setSelectedTerm('');
                      }}
                    >
                      {disease}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Secondary Diseases */}
      <div className="border-b border-gray-100 pb-2">
        <div
          className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-gray-50 rounded"
          onClick={() => toggleSection('secondary')}
        >
          <span className="text-sm font-medium text-[#207755]">Select Secondary Disease (s)</span>
          <ChevronDown className={`w-4 h-4 text-[#207755] transition-transform ${expandedSections.secondary ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.secondary && (
          <div className="relative mt-2">
            <div
              className="bg-gray-50 border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-[#207755] transition-all min-h-[2rem]"
              onClick={() => setShowSecondaryDropdown(!showSecondaryDropdown)}
            >
              {secondaryDiseases.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {secondaryDiseases.map(disease => (
                    <span
                      key={disease}
                      className="bg-[#207755] text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
                    >
                      {disease}
                      <X
                        className="w-3 h-3 cursor-pointer hover:bg-emerald-700 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSecondaryDisease(disease);
                        }}
                      />
                    </span>
                  ))}
                </div>
              )}
              <span className="text-gray-400 text-xs">
                {secondaryDiseases.length === 0 ? 'Select additional diseases' : `${secondaryDiseases.length} selected`}
              </span>
            </div>
            {showSecondaryDropdown && (
              <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-48 overflow-hidden">
                <div className="p-2 border-b sticky top-0 bg-white">
                  <div className="relative">
                    <Search className="absolute left-2 top-2 w-3 h-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-7 pr-2 py-1 text-xs border border-gray-200 rounded focus:border-[#207755] outline-none"
                      value={secondarySearch}
                      onChange={(e) => setSecondarySearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-40">
                  {filteredSecondaryDiseases.map(disease => (
                    <div
                      key={disease}
                      className="px-2 py-1.5 text-xs hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSecondaryDisease(disease);
                      }}
                    >
                      <div className={`w-3 h-3 rounded border flex items-center justify-center ${secondaryDiseases.includes(disease) ? 'bg-[#207755] border-[#207755]' : 'border-gray-300'}`}>
                        {secondaryDiseases.includes(disease) && <Check className="w-2 h-2 text-white" />}
                      </div>
                      {disease}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Region Selection */}
      <div className="border-b border-gray-100 pb-2">
        <div
          className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-gray-50 rounded"
          onClick={() => toggleSection('region')}
        >
          <span className="text-sm font-medium text-[#207755]">Select Country/ Region:</span>
          <ChevronDown className={`w-4 h-4 text-[#207755] transition-transform ${expandedSections.region ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.region && (
          <div className="mt-2 bg-gray-50 rounded-lg p-2 border border-gray-200 max-h-32 overflow-y-auto">
            {availableRegions.length > 0 ? (
              availableRegions.map(region => (
                <label
                  key={region}
                  className="flex items-center gap-2 py-1 hover:bg-white rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRegion === region}
                    onChange={() => {
                      setSelectedRegion(region);
                      setSelectedTerm('');
                    }}
                    className="w-3 h-3 text-[#207755] rounded border-gray-300 focus:ring-[#207755]"
                  />
                  <span className="text-xs text-gray-700">{region}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-400 text-xs text-center py-2">
                {primaryDisease ? 'No regions available' : 'Select a primary disease first'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Term Selection */}
      <div className="border-b border-gray-100 pb-2">
        <div
          className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-gray-50 rounded"
          onClick={() => toggleSection('term')}
        >
          <span className="text-sm font-medium text-[#207755]">Select A Term:</span>
          <ChevronDown className={`w-4 h-4 text-[#207755] transition-transform ${expandedSections.term ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.term && (
          <div className="mt-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
            {availableTerms.length > 0 ? (
              availableTerms.map(term => (
                <label
                  key={term.months}
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-white rounded cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="term"
                      value={term.months}
                      checked={selectedTerm === term.months.toString()}
                      onChange={(e) => setSelectedTerm(e.target.value)}
                      className="w-3 h-3 text-[#207755]"
                    />
                    <span className="text-xs text-gray-700">{term.months} months</span>
                  </div>
                  <span className="text-[#207755] font-semibold text-xs">{term.currency} {term.price}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-400 text-xs text-center py-2">
                {selectedRegion ? 'No terms available' : 'Select a region first'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="pb-2">
        <div
          className="flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-gray-50 rounded"
          onClick={() => toggleSection('payment')}
        >
          <span className="text-sm font-medium text-[#207755]">Payment Methods:</span>
          <ChevronDown className={`w-4 h-4 text-[#207755] transition-transform ${expandedSections.payment ? 'rotate-180' : ''}`} />
        </div>
        {expandedSections.payment && (
          <div className="mt-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
            {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map(method => (
              <label
                key={method}
                className="flex items-center gap-2 py-1 hover:bg-white rounded cursor-pointer"
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-3 h-3 text-[#207755]"
                />
                <span className="text-xs text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>

    <div className="pt-3 mt-auto">
      <button
        className="w-full bg-gradient-to-r from-[#207755] to-emerald-600 hover:from-emerald-700 hover:to-[#207755] text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
        onClick={handleStartTreatment}
      >
        Start Treatment
      </button>
    </div>
  </div>
</div>


          <div className="relative bg-[#E8E8E8] rounded-lg shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col">
            {/* Map Image */}
            <img
              src="/map.jpg"
              alt="World Map"
              className="w-full h-full object-cover"
            />

            {/* Top Overlay - Heading & Paragraph */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center px-4">
              <h2 className="text-black text-lg md:text-xl font-bold">
                <span className="font-bold">Personal</span>{' '}
                <span className="font-normal">Consultations</span>
              </h2>

              <p className="text-black text-xs md:text-sm mt-1 whitespace-nowrap">
                Looking for expert care in your vicinity? Look no further.
              </p>

            </div>

            {/* Bottom Overlay - Button */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 w-full flex justify-center">
              <button className="bg-[#207755] hover:bg-emerald-700 text-white font-semibold py-2.5 md:py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm">
                Book an Appointment
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}