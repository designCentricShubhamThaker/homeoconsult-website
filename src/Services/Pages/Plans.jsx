import React, { useState } from 'react';
import { Check, Star, ArrowRight, Package, FileText, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const navigate = useNavigate();
  const plans = [
    {
      id: 'comprehensive',
      name: 'Comprehensive',
      subtitle: 'Complete Care Package',
      price: 'Premium',
      icon: Package,
      color: 'emerald',
      gradient: 'from-emerald-400 to-emerald-600',
      features: [
        'Personalized medicine formulation',
        'Worldwide doorstep delivery',
        'Priority consultation support',
        'Treatment progress tracking',
        'Unlimited follow-up queries'
      ],
      popular: true
    },
    {
      id: 'non-comprehensive',
      name: 'Non Comprehensive',
      subtitle: 'Prescription Only',
      price: 'Standard',
      icon: FileText,
      color: 'teal',
      gradient: 'from-teal-400 to-teal-600',
      features: [
        'Detailed remedy prescription',
        'Email delivery of prescription',
        'Self-procurement guidance',
        'Dosage instructions included',
        'One-time consultation'
      ],
      popular: false
    },
    {
      id: 'pay-here',
      name: 'Pay Here',
      subtitle: 'Other Products',
      price: 'Variable',
      icon: CreditCard,
      color: 'slate',
      gradient: 'from-slate-400 to-slate-600',
      features: [
        'Individual product orders',
        'Medicines & supplements',
        'No treatment plan required',
        'Direct checkout process',
        'Flexible payment options'
      ],
      popular: false
    }
  ];

  return (

    <div className="w-full">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className="w-full md:w-1/2 text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center order-2 md:order-1" style={{ backgroundImage: "url('/ailments_banner.jpg')" }}>
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 md:mb-6">
            Services
          </h1>
          <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8">
            <span className="font-bold">Best Homeo Treatment</span> and Services
          </h2>
          <div className="mt-2 sm:mt-4">
            <p className="text-base sm:text-lg md:text-lg lg:text-xl font-semibold mb-2">
              Dr. Vaknalli's Clinics (Since 1975)
            </p>
            <p className="text-sm sm:text-base md:text-base lg:text-lg leading-relaxed">
              With over 80,000+ cases treated at our clinical centres in Mumbai,
              India, we now extend our Homeopathic treatments worldwide.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img
            src="./services_banner.jpg"
            alt="Doctor consultation"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-linear-to-br from-gray-50 to-gray-100 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-center mb-3 sm:mb-4 text-[#207755]">
              <span className='font-bold'>Choose Your </span><span className="font-normal">Perfect Plan</span>
            </h2>
            <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-600 px-4">
              Select the treatment option that best suits your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              const isHovered = hoveredPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${isSelected ? 'ring-4 ring-emerald-500 scale-105' : 'hover:scale-102'
                    } ${isHovered ? 'shadow-2xl' : ''}`}
                  onClick={() => {
                    if (plan.id === 'comprehensive') {
                      navigate('/services/comprehensive-plan');
                    } else {
                      setSelectedPlan(plan.id);
                    }
                  }}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {plan.popular && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                      <div className="bg-linear-to-r from-amber-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3 fill-current" />
                        POPULAR
                      </div>
                    </div>
                  )}

                  <div className={`bg-linear-to-br ${plan.gradient} p-5 sm:p-6 text-white relative`}>
                    <div className="relative z-10">
                      <Icon className="w-10 sm:w-12 h-10 sm:h-12 mb-2 sm:mb-3 opacity-90" />
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-xs sm:text-sm opacity-90">{plan.subtitle}</p>
                    </div>
                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white opacity-10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16" />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-5 sm:mb-6">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {plan.price}
                      </div>
                      <div className="h-1 w-12 sm:w-16 bg-linear-to-r from-emerald-500 to-teal-500 rounded" />
                    </div>

                    <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                          <Check className={`w-4 sm:w-5 h-4 sm:h-5 shrink-0 mt-0.5 text-${plan.color}-600`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${isSelected
                        ? `bg-linear-to-r ${plan.gradient} text-white shadow-lg`
                        : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                        }`}
                    >
                      {isSelected ? 'Selected' : 'Select Plan'}
                      <ArrowRight className={`w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                      <div className="w-7 sm:w-8 h-7 sm:h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <button className="bg-emerald-700 text-white px-2 sm:px-3 py-6 sm:py-8 rounded-l-lg shadow-lg hover:bg-emerald-800 transition-colors flex items-center gap-2">
          <span className="writing-mode-vertical text-xs sm:text-sm font-semibold tracking-wider">
            BOOK AN APPOINTMENT
          </span>
        </button>
      </div>

      <style jsx>{`
      .writing-mode-vertical {
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out;
      }
    `}</style>
    </div>


  );
}