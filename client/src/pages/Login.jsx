import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AppContext } from "../context/AppContext";

function Login() {
	const { loading, setLoading, handleLogin, navigate } = useContext(AppContext);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});



	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		// console.log(formData);

		e.preventDefault();
		handleLogin(formData);
	};

	return (
		<div className="login min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-600 to-black px-4 py-8">
			{loading ? (
				<Spinner />
			) : (
				<div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
					{/* Side image — hidden on mobile */}
					<div className="hidden md:block md:w-2/3 relative">
						<img
							className="w-full h-full object-cover"
							src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop"
							alt="BMW M4 - Rent VORTEX"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-center justify-center">
							<h2 className="text-white text-4xl font-extrabold drop-shadow-lg tracking-wide">Rent VORTEX</h2>
						</div>
					</div>

					{/* Form Panel */}
					<div className="w-full md:w-1/3 bg-white p-6 sm:p-8 flex flex-col justify-center">
						{/* Mobile-only brand title */}
						<div className="md:hidden text-center mb-6">
							<h2 className="text-2xl font-extrabold text-purple-700 tracking-wide">Rent VORTEX</h2>
							<p className="text-gray-500 text-sm mt-1">Welcome back!</p>
						</div>

						<form className="text-left">
							<h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
								Login
							</h1>
							<hr className="border-gray-300 mb-4" />

							<div className="mb-4">
								<label htmlFor="email" className="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">
									Email
								</label>
								<input
									id="email"
									type="email"
									name="email"
									className="w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>

							<label htmlFor="password" className="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">
								Password
							</label>
							<div className="mb-6 relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									name="password"
									className="w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
									value={formData.password}
									onChange={handleInputChange}
									required
								/>
								<div className="absolute inset-y-0 right-3 flex items-center">
									<button
										type="button"
										onClick={togglePasswordVisibility}
										className="text-gray-600 hover:text-gray-900 text-sm font-medium"
									>
										{showPassword ? "Hide" : "Show"}
									</button>
								</div>
							</div>

							<button
								type="submit"
								onClick={handleSubmit}
								className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold"
							>
								Login
							</button>

							<hr className="my-4 border-gray-300" />

							<div className="text-center">
								<Link to="/register" className="text-purple-600 hover:underline text-base sm:text-lg">
									Click Here to Register
								</Link>
							</div>
						</form>
						<div className="mt-4 text-center">
							<button
								onClick={() => navigate("/")}
								className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300 font-semibold"
							>
								Back to Home
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Login;
