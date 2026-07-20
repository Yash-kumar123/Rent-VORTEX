import React from "react";
import { Link } from "react-router-dom";
import P2 from "../assets/person_3.jpg";
import Celio from "../assets/celerio.jpg";
import Lux from "../assets/Luxury.jpg";
import SUV from "../assets/Suv.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white text-center py-12 sm:py-20 px-4">
        <Link
          to="/"
          className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white text-blue-600 py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-md font-bold hover:bg-blue-100 text-sm sm:text-base"
        >
          Home
        </Link>
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4 mt-8 sm:mt-0">About Rent Vortex</h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto">
          Your Trusted Partner for Reliable Car Rentals
        </p>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What is Rent Vortex?</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Rent Vortex is a premium car rental service dedicated to providing customers with a seamless, flexible, and
            affordable car rental experience. Whether you're planning a short trip or need long-term solutions, our fleet
            caters to every need with well-maintained vehicles at competitive prices.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Rent Vortex?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Wide Range of Vehicles", description: "From economy cars to luxury vehicles, we have the perfect option for every trip." },
              { title: "Flexible Rental Plans", description: "Choose daily, weekly, or monthly plans tailored to your needs and budget." },
              { title: "Affordable Prices", description: "Enjoy competitive pricing without compromising on quality or service." },
              { title: "24/7 Customer Support", description: "Our dedicated team is available round-the-clock to assist you." },
              { title: "Easy Online Booking", description: "Conveniently book your rental through our website or app anytime." },
              { title: "Free Delivery & Pickup", description: "Enjoy hassle-free delivery and pickup services at no extra charge." },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16 px-6">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Fleet</h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            From fuel-efficient economy cars to spacious SUVs and luxurious sedans, Rent Vortex offers a vehicle for every
            journey. Travel in comfort, style, and reliability!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Economy Cars", description: "Budget-friendly and ideal for city drives.", image: Celio },
              { title: "Luxury Cars", description: "Drive in style with premium luxury vehicles.", image: Lux },
              { title: "SUVs", description: "Spacious and perfect for family or adventure trips.", image: SUV },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            At Rent Vortex, our dedicated team works tirelessly to provide an exceptional experience for our customers.
          </p>
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs">
              <img
                src={P2}
                alt="Yash Kumar"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover grayscale"
              />
              <h3 className="text-xl font-semibold text-gray-800">Yash Kumar</h3>
              <p className="mt-2 text-gray-600">Full Stack Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6">
        <p>&copy; 2024 Rent Vortex. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
