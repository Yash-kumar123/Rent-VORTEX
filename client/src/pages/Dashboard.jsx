import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";
import Car_Booking_Card from "./Car_Booking_Card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const carIcon = new Icon({
	iconUrl: "https://cdn-icons-png.flaticon.com/512/9970/9970240.png",
	iconSize: [40, 40],
});

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
	const [viewMode, setViewMode] = useState("list"); // list or map

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
							<Link
								to="/host-dashboard"
								className="block px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50"
							>
								🛡️ Host Panel
							</Link>
							<Link
								to="/enlist-car"
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
							>
								🚗 Enlist a Car
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

			{/* Filter & View Mode Toggle Container */}
			<div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
				{/* Categories */}
				<div className="flex flex-wrap justify-center gap-2">
					{["All", "Economy", "Comfort", "SUV", "Luxury"].map((category) => (
						<button
							key={category}
							className={`px-4 py-1.5 rounded-full font-semibold text-xs transition duration-300 ${
								selectedCategory === category
									? "bg-blue-600 text-white shadow-sm"
									: "bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white"
							}`}
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</button>
					))}
				</div>

				{/* Map/List Switcher */}
				<div className="bg-gray-100 p-1 rounded-xl flex gap-1 border border-gray-200">
					<button
						type="button"
						onClick={() => setViewMode("list")}
						className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all duration-300 ${
							viewMode === "list"
								? "bg-blue-600 text-white shadow"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						📋 List View
					</button>
					<button
						type="button"
						onClick={() => setViewMode("map")}
						className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all duration-300 ${
							viewMode === "map"
								? "bg-blue-600 text-white shadow"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						🗺️ Map View
					</button>
				</div>
			</div>

			{/* Cars Display */}
			{loading ? (
				<SkeletonLoader />
			) : viewMode === "list" ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredCars.map((car) => (
						<Car_Booking_Card car={car} isAdmin={isAdmin} key={car._id} />
					))}
				</div>
			) : (
				<div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative z-10">
					<MapContainer
						center={[28.6139, 77.209]}
						zoom={11}
						className="w-full h-full"
					>
						<TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
						{filteredCars.map((car) => {
							const lat = car.location?.lat || 28.6139;
							const lng = car.location?.lng || 77.209;
							return (
								<Marker
									key={car._id}
									position={[lat, lng]}
									icon={carIcon}
								>
									<Popup>
										<div className="w-48 p-1 font-sans">
											<img
												src={car.image}
												alt={car.name}
												className="w-full h-24 object-cover rounded-lg mb-2 shadow-sm border border-gray-100"
											/>
											<h4 className="font-bold text-sm text-gray-800">{car.name}</h4>
											<div className="flex justify-between text-[10px] text-gray-500 font-semibold mb-2">
												<span>{car.capacity} Seater</span>
												<span>{car.fuelType}</span>
											</div>
											<div className="border-t pt-2 mt-2 flex justify-between items-center">
												<span className="text-xs font-extrabold text-blue-600">
													₹{car.rentPerHour}/hr
												</span>
												<Link
													to={`/booking/${car._id}`}
													state={{ car }}
													className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition"
												>
													Book Now
												</Link>
											</div>
										</div>
									</Popup>
								</Marker>
							);
						})}
					</MapContainer>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
