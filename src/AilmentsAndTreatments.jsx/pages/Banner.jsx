import React, { useState, useEffect } from 'react';
import { ChevronDown, Loader2, X, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import DiseaseTreatmentSection from './DiseaseTreamtmentSelector';

const Banner = () => {
  const { diseaseName } = useParams();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAccordions, setOpenAccordions] = useState({});
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // First FAQ open by default

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://lacey-flocculable-sherice.ngrok-free.dev/diseases/by-name/${diseaseName}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          }
        });
        // const response = await fetch(`http://localhost:8000/diseases/by-name/${diseaseName}`, {
        //   headers: {
        //     'ngrok-skip-browser-warning': 'true',
        //     'Content-Type': 'application/json'
        //   }
        // });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Disease not found');
          }
          throw new Error('Failed to load disease details');
        }

        const data = await response.json();
        console.log(data, 'data')
        setDisease(data);

        // Set first case study accordion open by default
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

  return (
    <div className="bg-gray-50">


      <div className="relative">
        <div className="hidden md:grid md:grid-cols-2 h-96">
          <div
            className="relative h-full bg-cover bg-center flex items-center justify-start px-12 lg:px-8"
            style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
          >
            <div className="text-white text-left max-w-lg  p-6 ">
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

          <div className=" px-6 py-10 text-center" style={{ backgroundImage: "url('/ailments_banner.jpg')" }}>
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

        {disease.understandings && disease.understandings.length > 0 && (
          <section className="mb-16 px-4 md:px-6">
            <h2 className="text-2xl md:text-2xl mb-8">
              <span className="text-[#207755] font-bold">Understanding</span>{' '}
              <span className="text-[#207755]">{disease.disease_name}</span>
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
                      className=" rounded-xl border border-[#207755] overflow-hidden 
                 transition-all duration-300 hover:bg-[#E6F5F0] cursor-pointer"
                    >
                      <div className="relative bg-[#207755] text-white font-semibold text-sm px-5 py-3">
                        {headingMap[category] || category}

                        <div
                          className="absolute left-6 -bottom-[6px] w-0 h-0
            border-l-[8px] border-l-transparent 
            border-r-[8px] border-r-transparent 
            border-t-[8px] border-t-[#207755]"
                        ></div>
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

        <section className="w-full bg-[#E4F4E8] py-10 px-4 md:px-8">
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
          <h2 className="text-3xl text-center font-bold  text-[#207755] mb-2">
            Patient's <span className="text-[#207755] font-normal">Case Studies</span>
          </h2>

          <div className="space-y-4">
            {disease.case_studies?.map((study, index) => (
              <div key={study.id} className=" overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5 bg-gray-50 p-8 flex flex-col justify-center" >
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-full  bg-gray-200 rounded-lg overflow-hidden mb-3">
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

                  <div className="md:w-3/5 p-8 overflow-y-auto" >
                    <div className="border-b border-gray-200">
                      <button
                        onClick={() => toggleAccordion(study.id, 'why-choose')}
                        className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-emerald-600">
                          Why Choose Our Approach?
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen(study.id, 'why-choose') ? 'transform rotate-180' : ''
                            }`}
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
                          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen(study.id, 'what-to-expect') ? 'transform rotate-180' : ''
                            }`}
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
                          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen(study.id, 'timeline') ? 'transform rotate-180' : ''
                            }`}
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

        {disease.accordions && disease.accordions.length > 0 && (
          <section className="w-full bg-[#7FB19C] py-16 px-4 md:px-8 ">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                <span className="font-normal">Frequently</span> Asked Questions
              </h2>

              <div className="space-y-4">
                {disease.accordions.map((accordion, index) => (
                  <div
                    key={accordion.id}
                    className="bg-white rounded-lg overflow-hidden"
                  >
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
    </div>
  );
};

export default Banner;