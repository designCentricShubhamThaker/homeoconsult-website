import React from 'react'
import Layout from '../Layout/Layout'
import HomeopathyBenefits from './pages/HomeopathyBeinifits';

const Homeopathy = () => {
  const principles = [
    {
      icon: "/core1.png",
      title: "Law of Similars",
      description: "The remedy that produces certain symptoms in healthy can cure similar symptoms in disease."
    },
    {
      icon: "/core2.png",
      title: "Law of Infinitesimal",
      description: "Smaller, potentized doses have deeper healing effects without toxicity."
    },
    {
      icon: "/core3.png",
      title: "Law of Individualization",
      description: "Every patient is unique — treatment is customized to physical and emotional traits, not just the disease."
    }
  ];

  const forms = [
    {
      title: "Dilution",
      description: "Potentized liquid or sugar pellets prescribed in microdoses."
    },
    {
      title: "Mother Solutions",
      description: "Safe, diluted chemical or herbal solutions."
    },
    {
      title: "Mother Tinctures",
      description: "Concentrated plant extracts used in material doses."
    },
    {
      title: "Triturations",
      description: "Powdered medicines blended with lactose, available as tablets or powders."
    }
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
              <h2 className="text-4xl lg:text-5xl xl:text-6xl mb-4 lg:mb-6">About Homeopathy</h2>

              <p className="text-lg lg:text-xl mb-2 lg:mb-3">
                Homeopathy <span className="font-bold">new age medicine</span>
              </p>

              <p className="text-base lg:text-lg xl:text-xl">
                We have successfully treated thousands of patients with a wide
                range of acute and chronic conditions using homeopathy.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative h-full overflow-hidden">
            <img
              src={`/why_homeo.jpg`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        {/* MOBILE VIEW */}
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

        {/* HISTORY SECTION */}
        <div className="bg-gray-100 py-10 sm:py-12 lg:py-16 px-5 sm:px-8 lg:px-12">
          <h2 className="text-[#207755] text-8xl sm:text-6xl lg:text-7xl font-light  hurricane-regular text-center mb-4 sm:mb-6">
            History
          </h2>

          <div className="w-full text-center">
            <p className="text-base sm:text-lg lg:text-xl npleading-relaxed text-gray-700">
              Founded in 1790 by German physician Dr. Samuel Hahnemann, homeopathy is
              based on the discovery that a substance causing symptoms in a healthy
              person can, in minute doses, treat similar symptoms in a sick person —
              a principle known as <span className="font-semibold italic">"like cures like."</span>
            </p>
          </div>
        </div>


      </div>

      <section>
        <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 lg:py-16">
          <h2 className="ttext-xl sm:text-2xl md:text-3xl font-bold text-center text-[#207755] mb-8 sm:mb-10 lg:mb-12">
            Core <span className='font-normal'>Principles</span>
          </h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            {principles.map((principle, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-gray-100 flex items-center justify-center mb-4 sm:mb-5">
                  <img
                    src={principle.icon}
                    alt={principle.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
                  />
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#207755] mb-2 sm:mb-3">
                  {principle.title}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full relative min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/abt_homeo_bg.jpg')" }}
          >

          </div>
          <div className="relative z-10 px-5 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-10 sm:mb-12 lg:mb-16">
              Forms of <span className="font-normal">Homeopathic</span> Medicine
            </h2>
            <div className="hidden lg:block w-full">
              <div className="relative h-[300px] lg:h-[350px] xl:h-[400px]">
                <div className="absolute top-8 lg:top-12 left-[2%] xl:left-[5%] 
w-[28%] lg:w-[30%] xl:w-[28%] h-24 lg:h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
p-3 lg:p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-base lg:text-lg font-semibold text-[#207755] mb-1">
                    {forms[0].title}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#207755] line-clamp-3">
                    {forms[0].description}
                  </p>
                </div>

                <div className="absolute bottom-12 lg:bottom-16 left-[22%] xl:left-[25%] 
w-[28%] lg:w-[30%] xl:w-[28%] h-24 lg:h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
p-3 lg:p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-base lg:text-lg font-semibold text-[#207755] mb-1">
                    {forms[2].title}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#207755] line-clamp-3">
                    {forms[2].description}
                  </p>
                </div>

                <div className="absolute top-8 lg:top-12 right-[22%] xl:right-[25%] 
w-[28%] lg:w-[30%] xl:w-[28%] h-24 lg:h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
p-3 lg:p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-base lg:text-lg font-semibold text-[#207755] mb-1">
                    {forms[1].title}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#207755] line-clamp-3">
                    {forms[1].description}
                  </p>
                </div>

                <div className="absolute bottom-12 lg:bottom-16 right-[2%] xl:right-[5%] 
w-[28%] lg:w-[30%] xl:w-[28%] h-24 lg:h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
p-3 lg:p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-base lg:text-lg font-semibold text-[#207755] mb-1">
                    {forms[3].title}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#207755] line-clamp-3">
                    {forms[3].description}
                  </p>
                </div>

              </div>
            </div>

            <div className="lg:hidden w-full space-y-4 sm:space-y-5">
              {forms.map((form, index) => (
                <div
                  key={index}
                  className="bg-green-100/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-lg"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-[#207755] mb-2">
                    {form.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#207755]">
                    {form.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


     <section className="w-full bg-white py-12 sm:py-14 lg:py-16 px-5 sm:px-8 lg:px-12 xl:px-16">
  <div className="w-full">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center">

      {/* Left Content */}
      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#207755]">
          <span className='font-bold'>Why Choose</span> 
          <span className="text-[#207755] font-normal"> Homeopathy</span>
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
          Conventional medicines often offer temporary relief by suppressing symptoms rather than addressing the root cause of disease. Homeopathy, on the other hand, focuses on treating the individual as a whole — not just the illness.
        </p>

        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
          Each person has an inherent disposition that determines their tendency to develop certain ailments. Homeopathic treatment strengthens this constitutional balance by considering one's temperament, medical and family history, genetic predisposition, and overall constitution.
        </p>

        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
          By stimulating the body's natural healing response, homeopathic medicines can relieve current symptoms and reduce future susceptibility to disease. Over time, this helps enhance immunity, reduce relapses, and promote long-term well-being.
        </p>
      </div>

      {/* Right Image */}
      <div className="w-full h-full flex items-start justify-center">
        <img
          src="./homeo_bottel.png"
          alt="Homeopathic herbs and bottles"
          className="w-auto h-full object-contain"
        />
      </div>

    </div>
  </div>
</section>



      <section className="w-full bg-white py-12 sm:py-14 lg:py-16 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src="./in_shot.jpg"
                alt="Happy family"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right Content */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#207755]">
                In Short
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                If you're struggling with chronic or recurring health issues and conventional treatments have only offered temporary relief, caused side effects, or weakened your immunity — it's time to consider Homeopathy.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Homeopathic medicine:
                </h3>

                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-[#207755]">
                      Strengthens{' '}
                      <span className="text-sm sm:text-base font-normal text-gray-600">
                        your body's natural healing ability
                      </span>
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-[#207755]">
                      Supports{' '}
                      <span className="text-sm sm:text-base font-normal text-gray-600">
                        not suppresses, your immunity
                      </span>
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-[#207755]">
                      Prevents{' '}
                      <span className="text-sm sm:text-base font-normal text-gray-600">
                        relapses without side effects
                      </span>
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-[#207755]">
                      Is safe{' '}
                      <span className="text-sm sm:text-base font-normal text-gray-600">
                        and gentle for all ages, including children and infants
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <HomeopathyBenefits />
      </section>

    </Layout>
  )
}

export default Homeopathy
