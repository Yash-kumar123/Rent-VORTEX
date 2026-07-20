import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Img1 from "../assets/Car_img1.jpg";
import Img2 from "../assets/Car_img2.jpg";
import Img3 from "../assets/Car_img3.jpg";
import Logo from "../assets/logo.jpg";
import { AppContext } from "../context/AppContext";

const LandingPage = () => {
	const { cookies, navigate } = useContext(AppContext);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const signUpButtonHandle = (e) => {
		e.preventDefault();
		if (cookies.token !== undefined) {
			navigate("/dashboard");
		} else {
			navigate("/login");
		}
	};

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-600 to-black">
			{/* Header */}
			<header className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 relative">
				{/* Logo */}
				<div className="flex items-center">
					<img src={Logo} alt="Rent Vortex Logo" className="w-24 sm:w-36 md:w-40 h-auto" />
				</div>

				{/* Desktop Nav */}
				<nav className="hidden md:flex space-x-8 text-white text-lg lg:text-2xl">
					<a href="/" className="hover:text-purple-300 transition duration-300 border-b-2 border-transparent hover:border-purple-300">
						Home
					</a>
					<a href="/help" className="hover:text-purple-300 transition duration-300 border-b-2 border-transparent hover:border-purple-300">
						Help
					</a>
					<a href="/about" className="hover:text-purple-300 transition duration-300 border-b-2 border-transparent hover:border-purple-300">
						About Us
					</a>
				</nav>

				{/* Desktop Auth Buttons */}
				<div className="hidden md:flex space-x-3">
					<button
						className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-purple-600 transition duration-300 text-sm font-semibold"
						onClick={signUpButtonHandle}
					>
						Sign In
					</button>
					<Link to="/register">
						<button className="text-white bg-purple-600 border border-purple-600 rounded px-4 py-2 hover:bg-white hover:text-purple-600 transition duration-300 text-sm font-semibold">
							Sign Up
						</button>
					</Link>
				</div>

				{/* Mobile Hamburger */}
				<button
					className="md:hidden text-white p-2 rounded-lg focus:outline-none"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle menu"
				>
					<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{mobileMenuOpen ? (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						) : (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						)}
					</svg>
				</button>
			</header>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-blue-900/95 backdrop-blur-sm border-t border-white/10 px-4 py-4 space-y-3 z-50">
					<a href="/" className="block text-white text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
						🏠 Home
					</a>
					<a href="/help" className="block text-white text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
						❓ Help
					</a>
					<a href="/about" className="block text-white text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
						ℹ️ About Us
					</a>
					<div className="flex gap-3 pt-2">
						<button
							className="flex-1 text-white border border-white rounded-lg px-4 py-2.5 hover:bg-white hover:text-purple-600 transition font-semibold"
							onClick={() => { setMobileMenuOpen(false); signUpButtonHandle({ preventDefault: () => {} }); }}
						>
							Sign In
						</button>
						<Link to="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
							<button className="w-full text-white bg-purple-600 border border-purple-600 rounded-lg px-4 py-2.5 hover:bg-white hover:text-purple-600 transition font-semibold">
								Sign Up
							</button>
						</Link>
					</div>
				</div>
			)}

			{/* Main Hero */}
			<main className="flex flex-col flex-1 justify-center items-center text-center px-4 py-10 sm:py-16">
				<h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-8 font-mono px-2">
					"Accelerate Your Journey with Us"
				</h1>
				<p className="text-purple-200 text-sm sm:text-base mb-8 max-w-md">
					Premium car rentals — affordable, flexible, and available near you.
				</p>

				{/* Image Cards — horizontal scroll on mobile, flex row on larger screens */}
				<div className="flex gap-4 sm:gap-6 overflow-x-auto w-full max-w-4xl px-4 pb-4 sm:justify-center snap-x snap-mandatory scrollbar-hide">
					{[Img1, Img2, Img3].map((img, idx) => (
						<div
							key={idx}
							className="min-w-[200px] sm:min-w-[220px] md:w-[250px] flex-shrink-0 rounded-2xl sm:rounded-3xl bg-gray-100 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 snap-center"
						>
							<img
								src={img}
								className="w-full h-44 sm:h-56 object-cover"
								alt={`Car Image ${idx + 1}`}
								loading="lazy"
							/>
						</div>
					))}
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-3 mt-8">
					<button
						onClick={signUpButtonHandle}
						className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition duration-300 text-base"
					>
						Get Started →
					</button>
					<a
						href="/about"
						className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-700 transition duration-300 text-base"
					>
						Learn More
					</a>
				</div>
			</main>
		</div>
	);
};

export default LandingPage;
