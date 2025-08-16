import React from 'react';
import { FaUtensils, FaUserShield, FaClipboardList, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-orange-50">
      <div className=" mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-[#ec644b]">
          About Our Hostel
        </h2>

        {/* Subtitle / Description */}
        <p className="text-gray-500 max-w-3xl mx-auto mb-10 text-xl">
          Welcome to our university hostel management system! Students can explore daily meals, share reviews, and enjoy a seamless experience. 
          Administrators can efficiently manage meals, track requests, and ensure smooth operations for everyone.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <FaUtensils className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl text-gray-600 font-semibold mb-2">Meal Management</h3>
            <p className="text-gray-600">View, add, and manage all hostel meals with ease.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <FaUserShield className="text-4xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl text-gray-600 font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600">Students and admins have role-based secure login access.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <FaClipboardList className="text-4xl text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl text-gray-600 font-semibold mb-2">Review & Feedback</h3>
            <p className="text-gray-600">Students can post meal reviews; admins can manage them efficiently.</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10">
          <h3 className="text-2xl text-gray-600 font-semibold mb-4">Contact Us</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <span>hostel@university.edu</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-500" />
              <span>+880 1111 567890</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
