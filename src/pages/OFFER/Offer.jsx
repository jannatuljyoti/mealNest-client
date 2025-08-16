import React from 'react';

const eventsData = [
  {
    title: "Summer Special Meal Offer",
    date: "August 20, 2025",
    description: "Get 20% off on all lunch meals this summer! Limited time offer for all students."
  },
  {
    title: "Weekly Recipe Contest",
    date: "Every Friday",
    description: "Submit your favorite recipe and win a free meal voucher for next week."
  },
  {
    title: "New Dish Launch",
    date: "September 1, 2025",
    description: "Try our brand new healthy breakfast options launching next month!"
  }
];

const Offer = () => {
    return (
          <div className="min-h-screen mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#ec644b] mb-10">Events & Offers</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {eventsData.map((event, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-[#ec644b] mb-2">{event.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{event.date}</p>
            <p className="text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Offer;