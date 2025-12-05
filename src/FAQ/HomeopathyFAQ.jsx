import React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, } from 'lucide-react';
import { Calendar } from 'lucide-react';
import Layout from '../Layout/Layout';

const HomeopathyFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      id: 1,
      question: "Is Homeopathy safe with other modes of treatment?",
      answer: "Yes. It is absolutely safe to continue medicines you are currently being prescribed. There is no harm in taking supplements or medications you are dependent on, during the course of the treatment. However, non-essential drugs may be weaned off or gradually discontinued as improvement sets in. (Please click here to view the Benefits of Homeopathy)."
    },
    {
      id: 2,
      question: "Does Homeopathy work on the placebo effect?",
      answer: "No, homeopathy is not based on placebo effect. It works on the principle of 'like cures like' and has been scientifically proven to be effective in treating various chronic and acute conditions. Millions of people worldwide have experienced real benefits from homeopathic treatment."
    },
    {
      id: 3,
      question: "Does homeopathy cure completely?",
      answer: "Homeopathy aims to treat the root cause of the disease rather than just suppressing symptoms. When properly prescribed by a qualified homeopath, it can provide complete and lasting cure for many chronic conditions. The treatment stimulates the body's own healing mechanisms."
    },
    {
      id: 4,
      question: "What are the limitations of homeopathy?",
      answer: "While homeopathy is effective for many conditions, it has limitations in cases requiring emergency surgery, advanced pathological conditions where tissue damage is irreversible, and certain life-threatening situations. It works best for functional disorders and chronic conditions."
    },
    {
      id: 5,
      question: "Does homeopathy reverse structural changes?",
      answer: "Homeopathy can help in early stages of structural changes by halting progression and improving symptoms. However, in cases of advanced structural damage or irreversible tissue changes, homeopathy may provide symptomatic relief but cannot reverse the damage completely."
    },
    {
      id: 6,
      question: "Will my condition recur?",
      answer: "When treated properly with constitutional homeopathic medicine, the chances of recurrence are significantly reduced. Homeopathy strengthens your immune system and treats the underlying susceptibility, making recurrence less likely compared to suppressive treatments."
    },
    {
      id: 7,
      question: "What is the duration of the treatment?",
      answer: "The duration varies depending on the nature and chronicity of the condition, individual response, and overall health. Acute conditions may respond within days to weeks, while chronic conditions may require several months of treatment. Your homeopath will provide a realistic timeline based on your specific case."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <section className="w-full  relative">
      {/* Sticky Book Appointment Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button className="bg-[#0d6e4f] text-white px-4 py-8 rounded-l-lg shadow-lg hover:bg-[#0a5940] transition-colors flex flex-col items-center gap-2 writing-mode-vertical">
          <Calendar className="w-5 h-5 rotate-90" />
          <span className="text-sm font-semibold whitespace-nowrap transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
            Book an Appointment
          </span>
        </button>
      </div>

      {/* FAQ Header */}
      <div className=" bg-[#7FB19C] w-full p-4 mb-8">
        <h2 className="text-3x ml-5  md:text-4xl font-bold text-white">
          FAQ 's
        </h2>
      </div>

      {/* FAQ List */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base md:text-lg font-semibold text-[#0d6e4f] pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <div className="w-8 h-8 rounded-full bg-[#0d6e4f] flex items-center justify-center">
                      <ChevronUp className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#0d6e4f] flex items-center justify-center">
                      <ChevronDown className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </Layout>

  );
};

export default HomeopathyFAQ;