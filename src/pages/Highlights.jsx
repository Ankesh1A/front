import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

// FAQs
const faqs = [
  {
    question: "How is my donation used?",
    answer: "Your donation directly supports the cause you select, ensuring maximum impact.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes, all donations are eligible for tax deductions under Section 80G.",
  },
  {
    question: "Can I donate anonymously?",
    answer: "Absolutely! You can choose to keep your identity confidential.",
  },
];

const Highlights = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="bg-[#f9fafb] font-sans">
      {/* Hero Section */}
      <div className="relative w-full min-h-[60vh] text-white flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full p-10">
          <h1 className="text-5xl font-bold mb-4">Support a Cause that Matters</h1>
          <p className="text-lg max-w-2xl">
            Choose to donate or become a member. Your contribution helps build a better world.
          </p>
        </div>
      </div>

      {/* Link Button */}
      <div className="flex justify-center mt-8">
        <Link to="/payHistory" className="bg-[#335288] text-white px-6 py-3 rounded-lg hover:bg-[#2b456e] transition">
          Payment History
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="py-12 px-4 sm:px-10 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold text-center text-[#335288] mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <button
                className="w-full flex justify-between items-center text-left text-lg font-medium text-[#335288] focus:outline-none"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                {faq.question}
                <ChevronDownIcon
                  className={`h-5 w-5 transform transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openFAQ === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
