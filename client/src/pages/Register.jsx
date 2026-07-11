import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AppContext } from "../context/AppContext";

function Register() {
	const { loading, setLoading, handleRegister, navigate } =
		useContext(AppContext);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if passwords match
		if (formData.password !== formData.confirmPassword) {
			setError("Password doesn't match.");
			return;
		}

		const { confirmPassword, ...registerData } = formData;
		handleRegister(registerData);
	};

	return (
		<div className="register h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-600 to-black">
			{loading && <Spinner />}
			<div className="flex w-full">
				<div className=" relative w-2/3 overflow-hidden">
					<img
						className="w-full h-full object-cover"
						src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop"
						alt="Bugatti Chiron - Rent VORTEX"
						loading="lazy"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-center justify-center">
						<h1 className="text-white text-5xl font-bold drop-shadow-lg">
							Rent VORTEX
						</h1>
					</div>
				</div>

				<div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg mx-4">
					<form onSubmit={handleSubmit} className="text-left">
						<h1 className="text-3xl font-semibold text-gray-700 mb-4">
							Register
						</h1>
						<hr className="border-gray-300 mb-4" />

						{/* Name Input */}
						<div className="mb-4">
							<label
								htmlFor="Name"
								className="block text-lg font-semibold text-gray-700 mb-2"
							>
								Name
							</label>
							<input
								id="name"
								type="name"
								name="name"
								className="w-full p-3 border border-gray-300 rounded-lg"
								value={formData.name}
								onChange={handleInputChange}
								required
							/>
						</div>
						{/* Email Input */}
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-lg font-semibold text-gray-700 mb-2"
							>
								Email
							</label>
							<input
								id="email"
								type="text"
								name="email"
								className="w-full p-3 border border-gray-300 rounded-lg"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
						</div>

						{/* Password Input */}
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-lg font-semibold text-gray-700 mb-2"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								name="password"
								className="w-full p-3 border border-gray-300 rounded-lg"
								value={formData.password}
								onChange={handleInputChange}
								required
							/>
						</div>

						{/* Confirm Password Input */}
						<div className="mb-6">
							<label
								htmlFor="confirmPassword"
								className="block text-lg font-semibold text-gray-700 mb-2"
							>
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								type="password"
								name="confirmPassword"
								className="w-full p-3 border border-gray-300 rounded-lg"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								required
							/>
						</div>

						{/* Error Message */}
						{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
						>
							Register
						</button>

						<hr className="my-4 border-gray-300" />

						<div className="text-center">
							<Link
								to="/login"
								className="text-purple-600 hover:underline text-lg"
							>
								Already have an account? Login here
							</Link>
						</div>
					</form>

					{/* Back Button */}
					<div className="mt-4 text-center">
						<button
							onClick={() => navigate("/")}
							className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300"
						>
							Back to Home
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
