import React, { useState } from 'react';
import { assets } from '../assets/assets';

const FAQsAccordion = ({ faqs}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden"> 
      <div className="md:flex">
  
        <div className="hidden md:block md:w-1/2 lg:w-[370px] relative md:pr-6"> 
          <img
            className='w-full absolute bottom-0 right-0 max-w-md translate-y-6' 
            src={assets.faq}
            alt="Doctor"
          />
        </div>

        <div className="md:w-2/3  p-6 bg-white shadow"> 
          <h2 className="text-2xl font-semibold mb-6 text-gray-800"> 
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-200 rounded">
              <button
                className="flex items-center justify-between w-full py-4 text-lg font-medium text-gray-700 focus:outline-none transition-colors duration-300 rounded hover:bg-gray-100"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                {faq.question}
                <svg
                  className={`w-6 h-6 text-gray-500  transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                id={`faq-content-${index}`}
                className={`overflow-hidden transition-max-h duration-300 ${
                  openIndex === index ? 'max-h-40 py-3' : 'max-h-0'
                }`}
              >
                <div className="text-gray-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsAccordion;