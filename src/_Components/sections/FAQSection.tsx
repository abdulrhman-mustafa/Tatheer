'use client';

import React, { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I launch an ad campaign through the platform?',
    answer:
      'Tatheer provides a comprehensive platform where brands can easily create and manage influencer marketing campaigns, connect with relevant influencers, and track performance effortlessly. Influencers can also find and apply for campaigns that match their content.',
  },
  {
    id: '2',
    question: 'Can I define my target audience for the campaign?',
    answer:
      'Yes, Tatheer allows you to precisely define your target audience based on demographics, interests, and online behavior to ensure your campaign reaches the most relevant users.',
  },
  {
    id: '3',
    question: 'Do I need to communicate directly with influencers?',
    answer:
      'While Tatheer provides tools for direct communication, the platform also streamlines the process, allowing you to manage campaigns efficiently without constant direct interaction, if you prefer.',
  },
  {
    id: '4',
    question: 'How is a “quality click” calculated?',
    answer:
      'A quality click on Tatheer is determined by a set of criteria including user engagement duration, subsequent actions on the landing page, and conversion rates, ensuring you only pay for valuable interactions.',
  },
  {
    id: '5',
    question: 'Can I track my campaign\'s performance in real-time?',
    answer:
      'Absolutely. Tatheer offers robust, real-time analytics dashboards that provide detailed insights into your campaign\'s performance, allowing for immediate adjustments and optimization.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId(prevId => (prevId === id ? null : id));
  };

  return (
    <section className="py-16 md:py-24">
      <h2 className="text-3xl mb-12 md:text-4xl text-center font-bold text-gray-800">FAQs</h2>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {mockFAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-input rounded-sm overflow-hidden p-2 transition-all duration-300"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-md font-normal px-4 py-3 text-secondary flex items-start justify-between gap-2 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`text-white bg-primary rounded-full p-1 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`px-4 text-gray-600 transition-all duration-300 ${
                    isOpen ? 'max-h-screen pt-2 pb-4 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};