import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Img4 from "../assets/Car-img4.jpg";
import { AppContext } from "../context/AppContext";

const HelpPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-100 to-indigo-100 text-white py-4 sm:py-6 text-center">
        <div className="flex justify-between items-center px-4 sm:px-6">
          {/* Home Button */}
          <a href="/" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg text-sm sm:text-lg">
            Home
          </a>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-Roboto">Help</h1>
          <div></div> {/* Empty div for spacing */}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-16 py-10 space-y-12">
        {/* FAQ Section */}
        <section id="faq" className="bg-white p-8 md:p-12 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <dl className="space-y-6 text-lg">
            {/* FAQ Questions */}
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q1: What is the minimum age to rent a car?</dt>
              <dd className="text-gray-600">Answer: You must be at least 21 years old to rent a car.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q2: Do I need a credit card to book a car?</dt>
              <dd className="text-gray-600">Answer: Yes, we require a valid credit card to secure your booking.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q3: Can I rent a car without insurance?</dt>
              <dd className="text-gray-600">Answer: No, insurance is mandatory for all rentals.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q4: Can I rent a car for a one-way trip?</dt>
              <dd className="text-gray-600">Answer: Yes, one-way rentals are available depending on the location.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q5: Is there a mileage limit?</dt>
              <dd className="text-gray-600">Answer: Most rentals include unlimited mileage, but some may have limits based on the location.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q6: What documents do I need to rent a car?</dt>
              <dd className="text-gray-600">Answer: You will need a valid driver's license, a credit card, and proof of insurance.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q7: Can I cancel or modify my booking?</dt>
              <dd className="text-gray-600">Answer: Yes, bookings can be canceled up to 24 hours before pickup for a full refund.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q8: What happens if I return the car late?</dt>
              <dd className="text-gray-600">Answer: Late returns may incur additional fees depending on the location and rental policy.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q9: Do you offer electric or hybrid cars?</dt>
              <dd className="text-gray-600">Answer: Yes, we offer electric and hybrid vehicles in select locations.</dd>
            </div>
            <div className="space-y-2">
              <dt className="font-semibold text-gray-700">Q10: Is there a deposit required to rent a car?</dt>
              <dd className="text-gray-600">Answer: Yes, a deposit may be required to cover potential damages or fees.</dd>
            </div>
          </dl>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="bg-white p-8 md:p-12 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-4">
            Have questions? Call us at: <strong className="text-purple-600">7982447014</strong>
          </p>
          <p className="text-lg text-gray-600">
            Or reach out via email at: <a href="mailto:support@rentvortex.com" className="text-purple-600">support@rentvortex.com</a>
          </p>
        </section>

        {/* Terms and Conditions Section */}
        <section className="text-center mt-8">
          <p className="text-lg text-gray-600">
            By using Rent Vortex, you agree to our{' '}
            <a href="/terms-and-conditions" className="text-purple-600 underline hover:text-purple-800">
              Terms and Conditions
            </a>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Rent Vortex | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HelpPage;
