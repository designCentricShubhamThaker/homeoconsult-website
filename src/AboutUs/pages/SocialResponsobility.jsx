import React from 'react';

const SocialResponsibility = () => {
  return (
    <div className="w-full  bg-gray-50 py-10 px-4">
      <div className=" mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 text-md leading-relaxed mb-6">
                Homeo Consult (India) is committed to social responsibility by providing services. We use our help and to all needy sections by providing it through Charitable Hospitals & Trusts.
              </p>
            </div>

            <div>
              <h3 className="text-gray-700  font-semibold text-base mb-2">
                They plan to support organizations like:
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-[#147140] text-md font-semibold ">
                  Ashadan (for the destitute and dying)
                </h4>
              </div>

              <div>
                <h4 className="text-[#147140] font-semibold text-md">
                  Children's Orphanage
                </h4>
              </div>

              <div>
                <h4 className="text-[#147140] font-semibold text-md">
                  Cancer Causes
                </h4>
              </div>
            </div>

            <div>
              <p className="text-gray-700 text-md leading-relaxed">
                They plan to continue this practice as long as they can be support through their valued services.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="/social_responsibility.png"
              alt="Elderly care"
              className="w-full h-98 object-cover"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default SocialResponsibility;