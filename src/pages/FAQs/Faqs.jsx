import React from 'react';
const faqsData = [
  {
    question: "How can I book a meal?",
    answer: "Go to the Meals page, select your preferred meal, and click on Book Now. Your booking will appear in My Bookings."
  },
  {
    question: "Can I cancel a booking?",
    answer: "Yes, you can cancel a booking from the My Bookings page before the scheduled meal time."
  },
  {
    question: "What are the payment options?",
    answer: "We support Stripe payments for packages and premium subscriptions."
  },
  {
    question: "How do I upgrade to a premium package?",
    answer: "Go to the Packages page and choose your preferred subscription. Complete the payment to upgrade."
  },
  {
    question: "Who can access the admin dashboard?",
    answer: "Only users with Admin role can access the Admin Dashboard."
  }
];

const Faqs = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#ec644b] mb-10">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#ec644b] mb-2">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Faqs;