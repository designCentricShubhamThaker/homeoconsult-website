import React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import Layout from '../Layout/Layout';

const ConsumerHealthFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      id: 1,
      question: "What is Homeopathy?",
      answer: "Homeopathy, founded in the 18th century by Dr. Samuel Hahnemann in Germany, offers a gentle, holistic approach to healing. Its medicines are prepared through extreme dilution of natural substances, often leaving no detectable material traces — a point debated by critics. Yet, Homeopathy's effectiveness over two centuries and countless successful treatments prove its value. The fact that modern science cannot fully explain its mechanism only shows that our understanding is still evolving."
    },
    {
      id: 2,
      question: "How do Homeopathic medicines work?",
      answer: "Homeopathic medicines work on the principle of 'like cures like' (similia similibus curentur). A substance that causes symptoms in a healthy person can cure similar symptoms in a sick person when given in highly diluted form. These ultra-diluted remedies stimulate the body's vital force or self-healing mechanism, triggering a natural response to restore balance and health. The remedies act as a catalyst to activate the body's own healing powers rather than suppressing symptoms."
    },
    {
      id: 3,
      question: "Is Homeopathy or Homeopathic treatment scientific?",
      answer: "Yes, homeopathy is based on scientific principles and systematic observation. Dr. Hahnemann developed it through rigorous proving (testing substances on healthy volunteers) and clinical verification. While the mechanism of ultra-high dilutions challenges conventional pharmacology, numerous clinical studies and meta-analyses have demonstrated positive results beyond placebo effect. Research in areas like nanoparticles and hormesis provides potential scientific explanations for homeopathy's action."
    },
    {
      id: 4,
      question: "Is Homeopathy or Homeopathic Medicines accepted by other branches of medicine?",
      answer: "Homeopathy is recognized and regulated in many countries worldwide. It is integrated into national healthcare systems in countries like India, Brazil, Switzerland, and parts of Europe. The World Health Organization (WHO) acknowledges homeopathy as the second largest system of medicine globally. While mainstream medicine debates its mechanism, millions of patients and thousands of practitioners worldwide use it successfully. Many medical doctors also practice homeopathy alongside conventional medicine."
    },
    {
      id: 5,
      question: "Are there any controversies regarding Homeopathy?",
      answer: "Yes, homeopathy faces skepticism primarily about its ultra-high dilutions and whether they contain any active molecules. Critics argue effects are placebo. However, supporters point to clinical experience, historical success, patient testimonials, and emerging research. The controversy often stems from applying conventional pharmaceutical models to a different healing paradigm. The debate continues in scientific and medical communities, with advocates calling for more research rather than dismissal."
    },
    {
      id: 6,
      question: "Is Homeopathic treatment safe in general?",
      answer: "Yes, homeopathic treatment is generally very safe when prescribed by qualified practitioners. Due to extreme dilution, homeopathic medicines have minimal risk of toxic side effects, making them safe for infants, pregnant women, and elderly patients. They don't interact harmfully with conventional medications. However, like any medical system, it's important to consult qualified homeopaths, avoid self-medication for serious conditions, and seek emergency care when needed. Safety also depends on proper diagnosis and case management."
    },
    {
      id: 7,
      question: "Can Homeopathy be used alongside conventional medicine?",
      answer: "Yes, homeopathic treatment can be safely used alongside conventional medicine in most cases. There are generally no harmful interactions between homeopathic remedies and pharmaceutical drugs. Many patients use both systems complementarily - conventional medicine for acute emergencies and homeopathy for chronic conditions or to reduce dependency on drugs. Always inform both your homeopath and conventional doctor about all treatments you're receiving for coordinated care."
    },
    {
      id: 8,
      question: "What conditions can Homeopathy treat?",
      answer: "Homeopathy can treat a wide range of acute and chronic conditions including allergies, skin diseases, respiratory disorders, digestive problems, hormonal imbalances, anxiety, depression, arthritis, migraines, and autoimmune conditions. It's particularly effective for functional disorders and conditions where conventional medicine offers only symptomatic relief. However, it has limitations in advanced pathological conditions, surgical emergencies, and cases requiring immediate life-saving interventions."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <section className="w-full bg-gradient-to-b from-[#4a9d7a] to-[#5eb88f] py-12 px-4 relative">
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
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Consumer Health
          </h2>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
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

export default ConsumerHealthFAQ;