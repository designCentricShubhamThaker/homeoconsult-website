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
            className="relative h-full bg-cover bg-center flex items-center justify-start px-12 lg:px-8"
            style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
          >
            <div className="text-white text-left max-w-lg p-6">
              <h2 className="text-5xl lg:text-6xl mb-6">About Homeopathy</h2>

              <p className="text-xl mb-3">
                Homeopathy <span className="font-bold">new age medicine</span>
              </p>

              <p className="text-lg lg:text-xl">
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
          <div className="relative h-64 overflow-hidden">
            <img
              src={`/why_homeo.jpg`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2️⃣ MOBILE BOTTOM — TEXT WITH ailments_banner BG */}
          <div
            className="px-6 py-10 text-center bg-cover bg-center"
            style={{ backgroundImage: "url('/ailments_banner.jpg')" }}
          >
            <h2 className="text-3xl mb-4 text-white font-bold">About Homeopathy</h2>

            <p className="text-lg mb-2 text-white">
              Homeopathy <span className="font-bold">new age medicine</span>
            </p>

            <p className="text-base leading-relaxed text-white/90">
              We have successfully treated thousands of patients with a wide
              range of acute and chronic conditions using homeopathy.
            </p>
          </div>

        </div>

        {/* HISTORY SECTION */}
        <div className="bg-gray-100 py-12 px-6">
          <h2 className="text-3xl font-bold text-[#207755] text-center mb-4">
            History
          </h2>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl leading-relaxed text-gray-700">
              Founded in 1790 by German physician Dr. Samuel Hahnemann, homeopathy is
              based on the discovery that a substance causing symptoms in a healthy
              person can, in minute doses, treat similar symptoms in a sick person —
              a principle known as <span className="font-semibold italic">"like cures like."</span>
            </p>
          </div>
        </div>


      </div>

      <section>
        <div className="w-full px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-12">
            Core Principles
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {principles.map((principle, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-40 md:h-40 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <img
                    src={principle.icon}
                    alt={principle.title}
                    className="w-25 h-25 md:w-27 md:h-27 object-contain"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3">
                  {principle.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full relative min-h-[400px] md:min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/abt_homeo_bg.jpg')" }}
          >

          </div>
          <div className="relative z-10 px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-12 md:mb-16">
              Forms of <span className="font-normal">Homeopathic</span> Medicine
            </h2>
            <div className="hidden md:block max-w-7xl mx-auto">
              <div className="relative h-[350px]">
                <div className="absolute top-12 left-4 
     w-80 h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
     p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    {forms[0].title}
                  </h3>
                  <p className="text-sm text-green-800 line-clamp-3">
                    {forms[0].description}
                  </p>
                </div>

                <div className="absolute bottom-16 left-1/4 
     w-80 h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
     p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    {forms[2].title}
                  </h3>
                  <p className="text-sm text-green-800 line-clamp-3">
                    {forms[2].description}
                  </p>
                </div>

                <div className="absolute top-12 right-1/4 
     w-80 h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
     p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    {forms[1].title}
                  </h3>
                  <p className="text-sm text-green-800 line-clamp-3">
                    {forms[1].description}
                  </p>
                </div>

                <div className="absolute bottom-4 right-8 
     w-80 h-28 bg-green-100/90 backdrop-blur-sm rounded-2xl 
     p-4 shadow-lg flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    {forms[3].title}
                  </h3>
                  <p className="text-sm text-green-800 line-clamp-3">
                    {forms[3].description}
                  </p>
                </div>

              </div>
            </div>

            <div className="md:hidden max-w-md mx-auto space-y-4">
              {forms.map((form, index) => (
                <div
                  key={index}
                  className="bg-green-100/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    {form.title}
                  </h3>
                  <p className="text-sm text-green-800">
                    {form.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4">
        <div className=" mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">
                Why Choose <span className="text-green-600">Homeopathy</span>
              </h2>

              <p className="text-gray-700 leading-relaxed">
                Conventional medicines often offer temporary relief by suppressing symptoms rather than addressing the root cause of disease. Homeopathy, on the other hand, focuses on treating the individual as a whole — not just the illness.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Each person has an inherent disposition that determines their tendency to develop certain ailments. Homeopathic treatment strengthens this constitutional balance by considering one's temperament, medical and family history, genetic predisposition, and overall constitution.
              </p>

              <p className="text-gray-700 leading-relaxed">
                By stimulating the body's natural healing response, homeopathic medicines can relieve current symptoms and reduce future susceptibility to disease. Over time, this helps enhance immunity, reduce relapses, and promote long-term well-being.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex items-start justify-center md:justify-end">
              <img
                src="./why_homeo2.jpg"
                alt="Homeopathic herbs and bottles"
                className="w-full max-w-lg object-contain h-100"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src="./in_shot.jpg"
                alt="Happy family"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800">
                In Short
              </h2>

              <p className="text-gray-700 leading-relaxed">
                If you're struggling with chronic or recurring health issues and conventional treatments have only offered temporary relief, caused side effects, or weakened your immunity — it's time to consider Homeopathy.
              </p>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Homeopathic medicine:
                </h3>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-xl font-semibold text-green-700">
                      Strengthens{' '}
                      <span className="text-base font-normal text-gray-600">
                        your body's natural healing ability
                      </span>
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-green-700">
                      Supports{' '}
                      <span className="text-base font-normal text-gray-600">
                        not suppresses, your immunity
                      </span>
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-green-700">
                      Prevents{' '}
                      <span className="text-base font-normal text-gray-600">
                        relapses without side effects
                      </span>
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-green-700">
                      Is safe{' '}
                      <span className="text-base font-normal text-gray-600">
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
