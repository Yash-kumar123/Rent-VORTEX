import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Unsplash presets based on category selection
const CAR_PRESETS = {
	Luxury: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop",
	SUV: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
	Economy: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop",
	Comfort: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop",
};

const EnlistCar = () => {
	const { user, navigate, setLoading } = useContext(AppContext);

	const [formData, setFormData] = useState({
		name: "",
		type: "Comfort",
		fuelType: "Petrol",
		capacity: 5,
		rentPerHour: 150,
		image: CAR_PRESETS.Comfort,
		location: { lat: 28.6139, lng: 77.209 }, // Default to New Delhi coordinates
	});

	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searching, setSearching] = useState(false);
	const [debounceTimer, setDebounceTimer] = useState(null);
	const [successMsg, setSuccessMsg] = useState("");

	const customIcon = new Icon({
		iconUrl: "https://cdn-icons-png.flaticon.com/512/9970/9970240.png",
		iconSize: [45, 45],
	});

	// Auto-update preset image when category type changes
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			image: CAR_PRESETS[prev.type],
		}));
	}, [formData.type]);

	const handleSearch = async (query) => {
		if (!query.trim() || query.length < 3) {
			setSearchResults([]);
			return;
		}
		setSearching(true);
		try {
			const res = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(
					query
				)}`
			);
			const data = await res.json();
			setSearchResults(data);
		} catch (err) {
			console.error("Nominatim Search failed:", err);
		} finally {
			setSearching(false);
		}
	};

	const onSearchChange = (value) => {
		setSearchQuery(value);
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}
		const timer = setTimeout(() => {
			handleSearch(value);
		}, 400);
		setDebounceTimer(timer);
	};

	useEffect(() => {
		return () => {
			if (debounceTimer) clearTimeout(debounceTimer);
		};
	}, [debounceTimer]);

	const LocationPicker = React.memo(() => {
		useMapEvents({
			click: (e) => {
				setFormData((prev) => ({
					...prev,
					location: { lat: e.latlng.lat, lng: e.latlng.lng },
				}));
			},
		});

		return formData.location ? (
			<Marker position={[formData.location.lat, formData.location.lng]} icon={customIcon} />
		) : null;
	});

	const ChangeMapCenter = ({ center }) => {
		const map = useMap();
		useEffect(() => {
			if (center) {
				map.flyTo(center, 14);
			}
		}, [center, map]);
		return null;
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccessMsg("");

		const carPayload = {
			...formData,
			owner: user._id, // Associate listed car with the current user
		};

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL || "http://localhost:5500/api/v1"}/addcar`,
				carPayload
			);
			setSuccessMsg("Your vehicle was listed successfully!");
			setTimeout(() => {
				navigate("/host-dashboard");
			}, 1500);
		} catch (err) {
			console.error("Listing car failed:", err);
			alert("Failed to list vehicle. Please check inputs and try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
			<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 relative">
				<button
					onClick={() => navigate("/host-dashboard")}
					className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
				>
					← Back to Dashboard
				</button>

				<h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
					Enlist Your Car for Rent
				</h1>

				{successMsg ? (
					<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center font-bold animate-bounce">
						{successMsg}
					</div>
				) : (
					<form onSubmit={handleFormSubmit} className="space-y-6">
						{/* Basic Specs Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-gray-700 font-semibold mb-1">
									Vehicle Name (Make & Model)
								</label>
								<input
									type="text"
									placeholder="e.g. Honda City 2023"
									value={formData.name}
									onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200"
									required
								/>
							</div>

							<div>
								<label className="block text-gray-700 font-semibold mb-1">
									Category / Type
								</label>
								<select
									value={formData.type}
									onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200"
								>
									<option value="Comfort">Comfort</option>
									<option value="Economy">Economy</option>
									<option value="SUV">SUV</option>
									<option value="Luxury">Luxury</option>
								</select>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label className="block text-gray-700 font-semibold mb-1">
									Fuel Type
								</label>
								<select
									value={formData.fuelType}
									onChange={(e) => setFormData((p) => ({ ...p, fuelType: e.target.value }))}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200"
								>
									<option value="Petrol">Petrol</option>
									<option value="Diesel">Diesel</option>
									<option value="CNG">CNG</option>
									<option value="Electric">Electric</option>
								</select>
							</div>

							<div>
								<label className="block text-gray-700 font-semibold mb-1">
									Seating Capacity
								</label>
								<input
									type="number"
									min="2"
									max="10"
									value={formData.capacity}
									onChange={(e) => setFormData((p) => ({ ...p, capacity: parseInt(e.target.value) }))}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200"
									required
								/>
							</div>

							<div>
								<label className="block text-gray-700 font-semibold mb-1">
									Rent per Hour (INR)
								</label>
								<input
									type="number"
									min="10"
									value={formData.rentPerHour}
									onChange={(e) => setFormData((p) => ({ ...p, rentPerHour: parseInt(e.target.value) }))}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200"
									required
								/>
							</div>
						</div>

						{/* Car Image Preview */}
						<div>
							<label className="block text-gray-700 font-semibold mb-1">
								Vehicle Image URL
							</label>
							<input
								type="text"
								value={formData.image}
								onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
								className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200 mb-2"
								required
							/>
							<div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden shadow-inner border">
								<img
									src={formData.image}
									alt="Preview"
									className="w-full h-full object-cover"
									onError={(e) => {
										e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800";
									}}
								/>
							</div>
						</div>

						{/* Map Location Picker */}
						<div>
							<label className="block text-gray-700 font-semibold mb-1">
								Set Pickup Location (Pin on Map)
							</label>
							<div className="relative z-20 mb-2">
								<div className="flex gap-2">
									<input
										type="text"
										placeholder="Search pickup address..."
										value={searchQuery}
										onChange={(e) => onSearchChange(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												handleSearch(searchQuery);
											}
										}}
										className="flex-1 p-2 border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-blue-200 text-sm"
									/>
									<button
										type="button"
										onClick={() => handleSearch(searchQuery)}
										className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow text-sm transition"
									>
										Search
									</button>
								</div>
								{searchResults.length > 0 && (
									<ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-30">
										{searchResults.map((result) => (
											<li
												key={result.place_id}
												onClick={() => {
													const lat = parseFloat(result.lat);
													const lng = parseFloat(result.lon);
													setFormData((prev) => ({ ...prev, location: { lat, lng } }));
													setSearchResults([]);
													setSearchQuery(result.display_name);
												}}
												className="p-2 hover:bg-gray-100 cursor-pointer text-xs text-gray-700 border-b last:border-0 truncate"
											>
												{result.display_name}
											</li>
										))}
									</ul>
								)}
							</div>

							<MapContainer
								className="z-10 rounded-xl overflow-hidden shadow"
								center={[formData.location.lat, formData.location.lng]}
								zoom={12}
								style={{ height: 250 }}
							>
								<TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
								<LocationPicker />
								<ChangeMapCenter center={[formData.location.lat, formData.location.lng]} />
							</MapContainer>
						</div>

						<button
							type="submit"
							className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition transform active:scale-95 text-center block"
						>
							List Vehicle Now
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default EnlistCar;
