'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I launch an ad campaign through the platform?',
    answer: 'Tatheer provides a comprehensive platform where brands can easily create and manage influencer marketing campaigns, connect with relevant influencers, and track performance effortlessly. Influencers can also find and apply for campaigns that match their content.',
  },
  {
    id: '2',
    question: 'Can I define my target audience for the campaign?',
    answer: 'Yes, Tatheer allows you to precisely define your target audience based on demographics, interests, and online behavior to ensure your campaign reaches the most relevant users.',
  },
  {
    id: '3',
    question: 'Do I need to communicate directly with influencers?',
    answer: 'While Tatheer provides tools for direct communication, the platform also streamlines the process, allowing you to manage campaigns efficiently without constant direct interaction, if you prefer.',
  },
  {
    id: '4',
    question: 'How is a “quality click” calculated?',
    answer: 'A quality click on Tatheer is determined by a set of criteria including user engagement duration, subsequent actions on the landing page, and conversion rates, ensuring you only pay for valuable interactions.',
  },
  {
    id: '5',
    question: 'Can I track my campaign\'s performance in real-time?',
    answer: 'Absolutely. Tatheer offers robust, real-time analytics dashboards that provide detailed insights into your campaign\'s performance, allowing for immediate adjustments and optimization.',
  },
];

function Icon({ id, open }: { id: string | number; open: string | number }) {
  return (
    <div className="bg-primary rounded-full  items-center justify-center flex p-0.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } transition-transform text-white w-5 h-5 `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  );
}

export const FAQSection: React.FC = () => {

  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpenQuestionId(prevId => (prevId === id ? null : id));
  };

  return (
    <section className="py-16 md:py-24">
          <h2 className="text-3xl mb-12 md:text-4xl text-center font-bold text-gray-800">FAQs</h2>
          <div className="line relative"></div>
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">

        <div className="max-w-3xl mx-auto space-y-4">
          {mockFAQs.map((faq) => (
            <Accordion
              key={faq.id}
              open={openQuestionId === faq.id} 
              
              className="bg-input rounded-sm overflow-hidden p-2"
            >
              <AccordionHeader
                className="text-md font-normal px-4 py-3 text-secondary flex items-start sm:items-center gap-2"
                onClick={() => handleOpen(faq.id)} 
              >
                {faq.question}
                <Icon id={faq.id} open={openQuestionId} />
              </AccordionHeader>

              <AccordionBody className="px-4 pb-4 pt-0 text-gray-600"> 
                {faq.answer}
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};
