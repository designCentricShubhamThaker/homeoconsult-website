import React from 'react';

export default function DiseaseTreatmentSection({ disease }) {
  return (
    <section className="px-4 md:px-6">
      {/* Wrapper with max-width to keep everything centered */}
      <div className="max-w-4xl mx-auto">
        
        <div className="p-4 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-[#207755] font-bold">Homeopathy Treatment</span>{' '}
            <span className="text-[#207755] font-normal">
              For {disease?.disease_name}
            </span>
          </h2>

          {/* Content block */}
          <div className="mt-4 w-full">
            <h3 className="text-xl md:text-2xl font-bold text-[#207755] mb-3">
              What is{' '}
              <span className="text-[#207755] font-normal">
                {disease?.disease_name}
              </span>
              ?
            </h3>

            <div className="prose max-w-none text-gray-700 leading-relaxed text-sm md:text-base text-justify">
              {disease?.what_is_content}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
