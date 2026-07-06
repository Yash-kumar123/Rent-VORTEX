import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";
import Car_Booking_Card from "./Car_Booking_Card";

const Dashboard = () => {
	const {
		loading,
		setLoading,
		handleLogin,
		navigate,
		cars,
		setCars,
		getAllCars,
		handleLogout,
		isAdmin,
	} = useContext(AppContext);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllCars()
			.then(() => {
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching cars:", err);
				setLoading(false);
			});
	}, []);

	// Filter cars based on search term and selected category
	const filteredCars =
		cars?.filter((car) => {
			const matchesSearch = car.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesCategory =
				selectedCategory === "All" || car.type === selectedCategory;
			return matchesSearch && matchesCategory;
		}) || [];

	return (
		<div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen relative">
			{/* Top Navigation */}
			<div className="flex justify-between items-center mb-6 relative z-50">
				{/* Home Button */}
				<Link
					to="/"
					className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
				>
					Home
				</Link>

				{/* Search Bar */}
				<input
					type="text"
					placeholder="Search cars..."
					className="p-2 w-3/4 md:w-1/3 bg-white rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				{/* Hamburger Menu */}
				<div className="relative">
					<button
						className="p-2 bg-blue-600 text-white rounded-full shadow-md focus:outline-none hover:bg-blue-700"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						☰
					</button>
					{isMenuOpen && (
						<div
							className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-48 z-50"
							style={{ zIndex: 1000 }}
						>
							{isAdmin && (
								<Link
									to="/add-car"
									className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Add Cars
								</Link>
							)}
							{/* Show My Bookings */}
							<Link
								to="/carbookings"
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
							>
								Show Car Bookings
							</Link>
							{/* Logout */}
							<button
								onClick={() => {
									handleLogout();
									console.log("Logged Out");
								}}
								className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Filter Buttons */}
			<div className="mb-6 flex justify-center space-x-4">
				{["All", "Economy", "Comfort", "SUV", "Luxury"].map((category) => (
					<button
						key={category}
						className={`px-4 py-2 rounded-full font-semibold ${
							selectedCategory === category
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
						}`}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</button>
				))}
			</div>

			{/* Cars Display */}
			{loading ? (
				<SkeletonLoader />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredCars.map((car) => (
						<Car_Booking_Card car={car} isAdmin={isAdmin} key={car._id} />
					))}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
