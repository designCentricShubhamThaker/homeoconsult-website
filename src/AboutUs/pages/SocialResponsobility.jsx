import React from 'react';

const SocialResponsibility = () => {
  return (
    <div className="w-full bg-gray-50 py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-5 md:mb-6">
                Homeo Consult (India) is committed to social responsibility by providing services. We use our help and to all needy sections by providing it through Charitable Hospitals & Trusts.
              </p>
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg mb-2">
                They plan to support organizations like:
              </h3>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div>
                <h4 className="text-[#147140] text-sm sm:text-base md:text-lg font-semibold">
                  Ashadan (for the destitute and dying)
                </h4>
              </div>

              <div>
                <h4 className="text-[#147140] font-semibold text-sm sm:text-base md:text-lg">
                  Children's Orphanage
                </h4>
              </div>

              <div>
                <h4 className="text-[#147140] font-semibold text-sm sm:text-base md:text-lg">
                  Cancer Causes
                </h4>
              </div>
            </div>

            <div>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                They plan to continue this practice as long as they can be support through their valued services.
              </p>
            </div>
          </div>

          <div className="relative w-full">
            <img
              src="/social_responsibility.png"
              alt="Elderly care"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialResponsibility;