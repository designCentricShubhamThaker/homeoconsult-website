import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, X, Check, MapPin, Calendar, CreditCard, User, Phone, Mail, Home, FileText } from 'lucide-react';
import Layout from '../../Layout/Layout'

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

export default function ComprehensivePlan() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPatient, setNewPatient] = useState('');
  const [currentCaseNo, setCurrentCaseNo] = useState('');

  const [countryRegion, setCountryRegion] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [city, setCity] = useState('');
  const [zipPostalCode, setZipPostalCode] = useState('');

  const [primaryDisease, setPrimaryDisease] = useState('');
  const [otherDisease, setOtherDisease] = useState('');
  const [primaryRegion, setPrimaryRegion] = useState('');
  const [primaryTerm, setPrimaryTerm] = useState('');
  const [primaryAvailableRegions, setPrimaryAvailableRegions] = useState([]);
  const [primaryAvailableTerms, setPrimaryAvailableTerms] = useState([]);
  const [primaryPriceInfo, setPrimaryPriceInfo] = useState(null);

  const [additionalDiseases, setAdditionalDiseases] = useState([]);
  const [showAdditionalDropdown, setShowAdditionalDropdown] = useState(false);
  const [additionalSearch, setAdditionalSearch] = useState('');

  const [paymentType, setPaymentType] = useState('');
  const [contactShippingInfo, setContactShippingInfo] = useState('');
  const [billingInfo, setBillingInfo] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/packages',
        {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        }
      );
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
        setPrimaryAvailableRegions(regions);
        if (regions.length > 0 && !primaryRegion) {
          setPrimaryRegion(regions[0]);
        }
      }
    }
  }, [primaryDisease, packages]);

  useEffect(() => {
    if (primaryDisease && primaryRegion && packages.length > 0) {
      const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");
      if (comprehensivePlan && comprehensivePlan.regions) {
        const regionData = comprehensivePlan.regions.find(
          r => r.disease === primaryDisease && r.location === primaryRegion
        );
        if (regionData) {
          const terms = regionData.duration_months.map((months, idx) => ({
            months,
            price: regionData.prices[idx],
            currency: regionData.currency
          }));
          setPrimaryAvailableTerms(terms);

          if (terms.length > 0 && !primaryTerm) {
            setPrimaryTerm(terms[0].months.toString());
          }
        }
      }
    }
  }, [primaryDisease, primaryRegion, packages]);

  useEffect(() => {
    if (primaryTerm && primaryAvailableTerms.length > 0) {
      const termInfo = primaryAvailableTerms.find(t => t.months === parseInt(primaryTerm));
      if (termInfo) {
        setPrimaryPriceInfo(termInfo);
      }
    }
  }, [primaryTerm, primaryAvailableTerms]);

  const addAdditionalDisease = (disease) => {
    if (!additionalDiseases.find(d => d.disease === disease)) {
      const newDisease = {
        disease,
        region: '',
        term: '',
        availableRegions: [],
        availableTerms: [],
        priceInfo: null
      };
      setAdditionalDiseases([...additionalDiseases, newDisease]);
      fetchRegionsForDisease(disease, additionalDiseases.length);
    }
    setShowAdditionalDropdown(false);
    setAdditionalSearch('');
  };

  const removeAdditionalDisease = (index) => {
    setAdditionalDiseases(additionalDiseases.filter((_, i) => i !== index));
  };

  const fetchRegionsForDisease = (disease, index) => {
    if (packages.length > 0) {
      const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");
      if (comprehensivePlan && comprehensivePlan.regions) {
        const matchingRegions = comprehensivePlan.regions.filter(r => r.disease === disease);
        const regions = [...new Set(matchingRegions.map(r => r.location))];

        setAdditionalDiseases(prev => {
          const updated = [...prev];
          if (updated[index]) {
            updated[index].availableRegions = regions;
            if (regions.length > 0) {
              updated[index].region = regions[0];
              fetchTermsForDisease(disease, regions[0], index);
            }
          }
          return updated;
        });
      }
    }
  };

  const fetchTermsForDisease = (disease, region, index) => {
    if (packages.length > 0) {
      const comprehensivePlan = packages.find(pkg => pkg.name === "Comprehensive plan");
      if (comprehensivePlan && comprehensivePlan.regions) {
        const regionData = comprehensivePlan.regions.find(
          r => r.disease === disease && r.location === region
        );
        if (regionData) {
          const terms = regionData.duration_months.map((months, idx) => ({
            months,
            price: regionData.prices[idx],
            currency: regionData.currency
          }));

          setAdditionalDiseases(prev => {
            const updated = [...prev];
            if (updated[index]) {
              updated[index].availableTerms = terms;
              if (terms.length > 0) {
                updated[index].term = terms[0].months.toString();
                updated[index].priceInfo = terms[0];
              }
            }
            return updated;
          });
        }
      }
    }
  };

  const updateAdditionalDiseaseRegion = (index, region) => {
    setAdditionalDiseases(prev => {
      const updated = [...prev];
      updated[index].region = region;
      updated[index].term = '';
      updated[index].priceInfo = null;
      fetchTermsForDisease(updated[index].disease, region, index);
      return updated;
    });
  };

  const updateAdditionalDiseaseTerm = (index, term) => {
    setAdditionalDiseases(prev => {
      const updated = [...prev];
      updated[index].term = term;
      const termInfo = updated[index].availableTerms.find(t => t.months === parseInt(term));
      updated[index].priceInfo = termInfo;
      return updated;
    });
  };

  const filteredAdditionalDiseases = DISEASES.filter(d =>
    d !== primaryDisease &&
    !additionalDiseases.find(ad => ad.disease === d) &&
    d.toLowerCase().includes(additionalSearch.toLowerCase())
  );

  const validateForm = () => {
    if (!name || !email || !phone || !newPatient) {
      alert('Please fill all required personal information fields');
      return false;
    }
    if (!countryRegion || !stateProvince || !city) {
      alert('Please fill all required address fields');
      return false;
    }
    if (!primaryDisease || !primaryRegion || !primaryTerm) {
      alert('Please complete primary disease information');
      return false;
    }
    if (!paymentType || !contactShippingInfo || !billingInfo) {
      alert('Please fill all required payment fields');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      personalInfo: {
        name,
        email,
        phone,
        newPatient,
        currentCaseNo
      },
      address: {
        countryRegion,
        stateProvince,
        city,
        zipPostalCode
      },
      primaryDisease: {
        disease: primaryDisease,
        otherDisease,
        region: primaryRegion,
        term: primaryTerm,
        priceInfo: primaryPriceInfo
      },
      additionalDiseases: additionalDiseases.map(d => ({
        disease: d.disease,
        region: d.region,
        term: d.term,
        priceInfo: d.priceInfo
      })),
      payment: {
        paymentType,
        contactShippingInfo,
        billingInfo
      }
    };
    console.log('Comprehensive Plan Submission:', formData);
    alert('Form submitted! Check console for details.');
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row min-h-[400px]">
          <div className="w-full md:w-1/2 text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center order-2 md:order-1" style={{ backgroundImage: "url('/ailments_banner.jpg')" }}>
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 md:mb-6">
              Comprehensive Plan
            </h1>
            <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8">
              <span className="font-bold">Complete Care Package</span>
            </h2>
            <div className="mt-2 sm:mt-4">
              <p className="text-base sm:text-lg md:text-lg lg:text-xl font-semibold mb-2">
                Dr. Vaknalli's Clinics (Since 1975)
              </p>
              <p className="text-sm sm:text-base md:text-base lg:text-lg leading-relaxed">
                Personalized treatment with worldwide delivery and unlimited follow-ups.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <img
              src="../services_banner.jpg"
              alt="Doctor consultation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        <div className="py-6 sm:py-8 px-4 sm:px-6 bg-cover " style={{ backgroundImage: "url('http://localhost:5173/contact.jpg')" }}>
          <div className="py-6 px-4  sm:px-6 lg:px-8  flex justify-center items-center ">
            <div >
              <div className="text-center mb-4">
                <h2 className="text-2xl text-[#207755] mb-1">
                  <span className="font-semibold">Start Your </span>
                  <span className="font-normal">Treatment Today</span>
                </h2>
                <p className="text-gray-600 text-sm">Complete the form below to begin your comprehensive care</p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-xs font-semibold text-[#207755]  mb-2 pb-1 border-b border-gray-200">Personal Info</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                            required
                          />
                          <User className="absolute right-2 top-2 w-3 h-3 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                            required
                          />
                          <Mail className="absolute right-2 top-2 w-3 h-3 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                            required
                          />
                          <Phone className="absolute right-2 top-2 w-3 h-3 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <div>
                          <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                            Patient <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={newPatient}
                            onChange={(e) => setNewPatient(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                            required
                          >
                            <option value="">Select</option>
                            <option value="yes">New</option>
                            <option value="no">Existing</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                            Case No.
                          </label>
                          <input
                            type="text"
                            value={currentCaseNo}
                            onChange={(e) => setCurrentCaseNo(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-xs font-semibold text-[#207755]  mb-2 pb-1 border-b border-gray-200">Address</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={countryRegion}
                            onChange={(e) => setCountryRegion(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                            required
                          />
                          <MapPin className="absolute right-2 top-2 w-3 h-3 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <div>
                          <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                            State <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={stateProvince}
                            onChange={(e) => setStateProvince(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          value={zipPostalCode}
                          onChange={(e) => setZipPostalCode(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Row - Primary Treatment and Additional Diseases */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-3 border-t border-gray-200">

                  {/* Primary Treatment */}
                  <div>
                    <h3 className="text-xs font-semibold text-[#207755]  mb-2 pb-1 border-b border-gray-200">Primary Treatment</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                          Disease <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={primaryDisease}
                          onChange={(e) => {
                            setPrimaryDisease(e.target.value);
                            setPrimaryRegion('');
                            setPrimaryTerm('');
                          }}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                          required
                        >
                          <option value="">Select condition</option>
                          {DISEASES.map(disease => (
                            <option key={disease} value={disease}>{disease}</option>
                          ))}
                        </select>
                      </div>



                      <div className="grid grid-cols-2 gap-1.5">
                        <div>
                          <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                            Region <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={primaryRegion}
                            onChange={(e) => {
                              setPrimaryRegion(e.target.value);
                              setPrimaryTerm('');
                            }}
                            disabled={primaryAvailableRegions.length === 0}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none disabled:bg-gray-100"
                            required
                          >
                            <option value="">Region</option>
                            {primaryAvailableRegions.map(region => (
                              <option key={region} value={region}>{region}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                            Duration <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={primaryTerm}
                            onChange={(e) => setPrimaryTerm(e.target.value)}
                            disabled={primaryAvailableTerms.length === 0}
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none disabled:bg-gray-100"
                            required
                          >
                            <option value="">Duration</option>
                            {primaryAvailableTerms.map(term => (
                              <option key={term.months} value={term.months}>
                                {term.months}m - {term.currency} {term.price}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Diseases */}
                  <div>
                    <h3 className="text-xs font-semibold text-[#207755]  mb-2 pb-1 border-b border-gray-200">
                      Additional Diseases <span className="text-[10px] font-normal text-gray-500">(optional)</span>
                    </h3>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                          Secondary Disease
                        </label>
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              addAdditionalDisease(e.target.value);
                              e.target.value = "";
                            }
                          }}
                          className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                        >
                          <option value="">Select condition</option>
                          {filteredAdditionalDiseases.map(disease => (
                            <option key={disease} value={disease}>{disease}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        {additionalDiseases.map((disease, index) => (
                          <div key={index} className="bg-gray-50 rounded p-2 border border-gray-200">
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="text-[10px] font-semibold text-[#207755] ">{disease.disease}</h4>
                              <button
                                type="button"
                                onClick={() => removeAdditionalDisease(index)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>

                            <div>
                              <select
                                value={disease.term}
                                onChange={(e) => updateAdditionalDiseaseTerm(index, e.target.value)}
                                disabled={disease.availableTerms.length === 0}
                                className="w-full border border-gray-300 rounded px-1.5 py-1 text-[10px] focus:outline-none focus:border-gray-400 disabled:bg-gray-100"
                              >
                                <option value="">Duration</option>
                                {disease.availableTerms.map(term => (
                                  <option key={term.months} value={term.months}>
                                    {term.months}m - {term.currency} {term.price}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {disease.priceInfo && (
                              <div className="mt-1.5 text-[10px] text-gray-600">
                                <span className="font-semibold">Cost: </span>
                                {disease.priceInfo.currency} {disease.priceInfo.price}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                   
                    </div>
                  </div>
                </div>

                {/* Third Row - Billing */}
                <div className="pt-3 border-t border-gray-200">
                  <h3 className="text-xs font-semibold text-[#207755]  mb-2 pb-1 border-b border-gray-200">Payment & Billing</h3>
                  <div className="max-w-md">
                    <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:border-gray-400 focus:outline-none"
                      required
                    >
                      <option value="">Select method</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="UPI">UPI</option>
                      <option value="Net Banking">Net Banking</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-[#207755] cursor-pointer hover:bg-[#1a6245] text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                   
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className=" py-10 sm:py-12" >
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl text-center mb-6 text-[#207755]">
              <span className='font-bold'>Comprehensive Plan </span><span className="font-normal">Flow Chart</span>
            </h2>

            <div className="mb-8">
              <img
                src="/flow_chart.png"
                alt="Comprehensive Plan Flow Chart"
                className="w-full mx-auto"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
                <h3 className="text-lg font-bold text-[#207755] mb-3">Recommended for:</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#207755] ">Long-standing or chronic conditions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#207755] ">Unlimited consults & personalized attention</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border-2 border-teal-200">
                <h3 className="text-lg font-bold text-[#207755] mb-3">Includes</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#207755] ">Initial case analysis by our physicians</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#207755] ">Unlimited follow-ups during treatment</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#207755] ">Consultation, medicines & courier costs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}