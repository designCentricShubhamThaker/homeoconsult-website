import React from 'react';

export default function DiseaseTreatmentSection({ disease }) {


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

        
      </div>
    </section>
  );
}