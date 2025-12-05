import React from 'react';
import { AlertCircle, FileText, CreditCard, Shield } from 'lucide-react';
import Layout from '../Layout/Layout';

const DisclaimerComponent = () => {
  return (
    <Layout>
      <div className=" bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto">

          {/* Header */}
  <div className="w-full bg-[#207755] px-4 sm:px-8 lg:px-12 py-8 mb-10">
  {/* Icon + Heading Row */}
  <div className="flex items-center gap-4 mb-3">
    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
      <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
    </div>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
      Site Disclaimer & Information
    </h1>
  </div>

  {/* Description */}
  <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl">
    Please read, understand, and accept these terms before using our services
  </p>
</div>



          {/* Grid Layout - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

            {/* Card 1 - General Disclaimer */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle className="w-7 h-7 text-[#207755] flex-shrink-0" />
                <h2 className="text-xl font-bold text-[#207755]">
                  General Disclaimer
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  The information & specifications contained on this website has been checked for accuracy. However, specifications & technical data are subject to change without intimation. The listed values are guide values, & should not be considered legally binding.
                </p>
                <p>
                  Various external links may have been made to other websites for your convenience. HomeoConsult Research & Development or Dr. Anish V. Vaknalli are not liable nor shall be held responsible for any content on any website whatsoever.
                </p>
                <p>
                  All names displayed of other manufacturers & parties are/may be Trademarks & Registered Copyrights of those manufacturers & parties.
                </p>
                <p>
                  As technology keeps changing, information & views stated on this website may be altered, appended &/or deleted. HomeoConsult Research & Development &/or Dr. Anish V. Vaknalli reserve the right to alter specifications without prior notice.
                </p>
                <p className="text-xs italic text-gray-500 pt-2">
                  Please contact the Sitemaster in case you have problems accessing this site or experience any broken links / missing images.
                </p>
              </div>
            </div>

            {/* Card 2 - Treatment Safety */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="w-7 h-7 text-[#207755] flex-shrink-0" />
                <h2 className="text-xl font-bold text-[#207755]">
                  Treatment Safety
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  Homeopathic medicines are absolutely safe when prescribed alone or concomitantly with other modes of treatment. There are no known drug interactions between Homeopathic medicines and other medications.
                </p>
                <p>
                  Homeopathic medicines have earned a reputation as being safe, non-toxic and free of any side effects. During treatment, any adverse medical signs observed will not be considered as side effects of the Homeopathic medicines prescribed.
                </p>
                <p>
                  Environmental factors, psychological factors, diet, natural progression of the disease etc. will be taken into consideration and appropriate corrective measures will be advised.
                </p>
              </div>
            </div>

            {/* Card 3 - Medical Disclaimer */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-7 h-7 text-[#207755] flex-shrink-0" />
                <h2 className="text-xl font-bold text-[#207755]">
                  Medical Disclaimer
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  Due to the nature of online consultation we do not make any attempt to replace medical or surgical diagnosis, management and treatment discussed by your Doctor. However, after evaluation of your case and medical reports if any, we do consider the diagnosis and recommend the needful.
                </p>
                <p>
                  The content on the "HomeoConsult" site is general in nature; it is presented in a concise form, and is provided for basic educational purposes only.
                </p>
                <p>
                  The Homeopathic scope, approach and treatment content provided on this site is a result of clinical observations made by the panel of doctors on this site, and may vary considerably among Homeopathic physicians and two cases of similar kind.
                </p>
                <p className="font-medium text-gray-700">
                  It is mandatory that you seek the advice of your Doctor or Specialist with any questions you may have regarding a specific medical condition before you take any action on it.
                </p>
              </div>
            </div>

          </div>

          {/* Full Width Cards */}
          <div className="space-y-8">

            {/* Content Accuracy */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle className="w-7 h-7 text-[#207755] flex-shrink-0" />
                <h2 className="text-xl font-bold text-[#207755]">
                  Content Accuracy & Usage
                </h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The content of the "HomeoConsult" site comes from medical sources believed to be accurate, but may contain inaccuracies or typographical errors. The use of "HomeoConsult" site, its Content, and Treatment Outcome are at your own risk.
              </p>
            </div>

            {/* Payment Terms */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <CreditCard className="w-7 h-7 text-[#207755] flex-shrink-0" />
                <h2 className="text-xl font-bold text-[#207755]">
                  Payment Terms & Conditions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>
                    You may pay for online consultation through our secure host online account. After receiving your payment a detail case-analysis questionnaire will be e-mailed to your submitted e-mail address.
                  </p>
                  <p>
                    Medicines are couriered or mailed to your requested postal address usually within 72 hours or three working days of receiving your submitted questionnaire.
                  </p>
                </div>
                <div className="bg-[#207755] bg-opacity-5 rounded-lg p-6">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    The Panel of Doctors on "HomeoConsult" site does not guarantee a cure for your ailment or disease condition. In the event that you do not respond favorably, you will be in no position to make any claim whatsoever.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Notice */}
          <div className="mt-12 bg-[#207755] rounded-xl p-8 text-center">
            <p className="text-white text-sm sm:text-base font-medium">
              By using this website, you acknowledge that you have read, understood, and accepted this disclaimer.
            </p>
          </div>

        </div>
      </div>
    </Layout>

  );
};

export default DisclaimerComponent;