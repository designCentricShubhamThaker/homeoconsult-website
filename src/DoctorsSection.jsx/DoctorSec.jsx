import React from 'react'
import Layout from '../Layout/Layout'

const DoctorSec = () => {

  const practiceData = [
    {
      icon: '/doc_sec_icon1.png',
      title: 'Individualized Remedies',
      description: 'No side effects or contraindications; suitable for all ages, including infants.'
    },
    {
      icon: '/doc_sec_icon2.png',
      title: 'Single or Combined Remedies',
      description: 'Depending on the case, we may use a constitutional and/or supportive remedy.'
    },
    {
      icon: '/doc_sec_icon3.png',
      title: 'Superficial & Deep Acting Remedies',
      description: 'Acute relief and long-term healing are balanced for best results.'
    },
    {
      icon: '/doc_sec_icon4.png',
      title: 'Flexible Dosage',
      description: 'Remedies are repeated or paused as the condition evolves.'
    },
    {
      icon: '/doc_sec_icon5.png',
      title: 'Palliation & Support',
      description: 'In chronic or irreversible cases, we aim to relieve symptoms and enhance quality of life.'
    }
  ];


  const guidingPrinciples = [
    'Proven & documented remedies',
    'Unbiased, symptom-based prescription',
    'Continuous learning',
    "Faithful to Hahnemann's teachings"
  ];
  return (
    <Layout>
      <div className="relative">

        {/* DESKTOP VIEW */}
        <div className="hidden md:grid md:grid-cols-2 h-96">

          {/* LEFT SIDE BG IMAGE */}
          <div
            className="relative h-full bg-cover bg-center flex items-center justify-start px-6 lg:px-12 xl:px-16"
            style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
          >
            <div className="text-white text-left w-full">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl mb-4 lg:mb-6">Doctor's Section</h2>

              <p className="text-lg lg:text-xl mb-2 lg:mb-3">
                Classical Homeopathy<span className="font-bold"> and our practice</span>
              </p>

              <p className="text-base lg:text-lg xl:text-xl">
                At our centres, we practice <span className='font-bold'>Classical Homeopathy</span> — true to Hahnemann’s Organon — combining traditional principles with over<span className='font-bold'> 15 years of clinical experience and 60,000+ successfully treated cases</span>
              </p>
            </div>
          </div>

          <div className="relative h-full overflow-hidden">
            <img
              src={`/doc_sec_banner.jpg`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:hidden">

          {/* 1️⃣ MOBILE TOP — IMAGE FIRST */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={`/why_homeo.jpg`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2️⃣ MOBILE BOTTOM — TEXT WITH ailments_banner BG */}
          <div
            className="px-5 sm:px-8 py-8 sm:py-10 text-center bg-cover bg-center"
            style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
          >
            <h2 className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-white font-bold">About Homeopathy</h2>

            <p className="text-base sm:text-lg mb-2 text-white">
              Homeopathy <span className="font-bold">new age medicine</span>
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-white/90">
              We have successfully treated thousands of patients with a wide
              range of acute and chronic conditions using homeopathy.
            </p>
          </div>

        </div>


        <section>
          <div className="relative w-full min-h-[500px] bg-cover bg-center py-16 px-4" style={{ backgroundImage: "url('/doc_sec_bg.jpg')" }}>
            <div className="absolute inset-0 bg-teal-600/40"></div>

            <div className="relative max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
                How We <span className="font-normal">Practice</span>
              </h2>

              <div className="flex flex-wrap justify-center items-start gap-6 lg:gap-4">
                {practiceData.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col items-center text-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-16px)] ${index % 2 === 1 ? 'lg:mt-12' : 'lg:mt-0'
                      }`}
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                      <img src={item.icon} alt={item.title} className="w-20 h-20" />
                    </div>
                    <h3 className="text-lg font-bold 
         text-[#207755] mb-2 whitespace-pre-line">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="w-full bg-gradient-to-br from-green-50 via-white to-teal-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                {/* Left Section - Guiding Principles */}
                <div className="lg:col-span-1">
                  <h2 className="text-2xl md:text-2xl font-bold mb-3">
                    <span className="text-[#207755]">Our Guiding</span> <span className="text-[#207755] font-normal">Principles</span>
                  </h2>

                  <div className="space-y-4">
                    {guidingPrinciples.map((principle, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-[#207755] flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-700 text-base md:text-lg">{principle}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Section - Image */}
                <div className="lg:col-span-1 flex justify-center items-center py-8 lg:py-0">
                  <img
                    src="/Doctor_Section_bg.png"
                    alt="Homeopathy bottles"
                    className="w-full max-w-xs md:max-w-sm object-contain"
                  />
                </div>

                {/* Right Section - Mission */}
                <div className="lg:col-span-1">
                  <h2 className="text-2xl md:text-2xl font-bold mb-6">
                    <span className="text-[#207755]">Our</span> <span className="text-[#207755] font-normal">Mission</span>
                  </h2>

                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic font-light">
                    Homoeopathy is a lifelong journey of learning, evolving, and sharing. We remain committed to evidence-based, ethical, and individualized healing for every patient.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>


      </div>
    </Layout>
  )
}

export default DoctorSec