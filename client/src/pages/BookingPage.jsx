import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { AppContext } from "../context/AppContext";
import PayementModal from "../components/PaymentModal";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const BookingPage = () => {
	const { navigate, loading, setLoading, makeBooking, user } =
		useContext(AppContext);
	const { id } = useParams();
	const location = useLocation();
	const { car } = location.state || {};
	const [formData, setFormData] = useState({
		startDate: "",
		endDate: "",
		driverRequired: false,
		location: null, // Store location coordinates
	});
	const [totalCost, setTotalCost] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [payment, setPayment] = useState({ status: null, paymentID: null });
	const customIcon = new Icon({
		iconUrl: "https://cdn-icons-png.flaticon.com/512/9970/9970240.png",
		iconSize: [45, 45],
	});
	useEffect(() => {
		async function paymentHandle() {
			if (payment.status === "success") {
				setLoading(true);
				try {
					const totalHours =
						(new Date(formData.endDate) - new Date(formData.startDate)) /
						(1000 * 60 * 60);
					const bookingData = {
						car: car._id,
						user: user._id ?? "Unknown User",
						bookedTimeSlots: {
							from:
								formData.startDate !== ""
									? formData.startDate
									: new Date().toISOString().split("T")[0],
							to:
								formData.endDate !== ""
									? formData.endDate
									: new Date(new Date().setDate(new Date().getDate() + 1))
											.toISOString()
											.split("T")[0],
						},
						totalHours: totalHours ? totalHours : 24,
						totalAmount: totalCost,
						transactionId: payment.paymentID,
						driverRequired: formData.driverRequired,
						location: formData.location, // Include location data
					};
					// console.log(bookingData);
					await makeBooking(bookingData); // Ensure the function `bookCar` matches your implementation
					navigate("/success", { state: { transactionId: payment.paymentID } });
				} catch (err) {
					console.error("Error while booking:", err);
				} finally {
					setLoading(false);
				}
			} else if (payment.status === "failed") {
				alert("Payment Failed. Please Try Again");
			}
			setPayment({ status: null, paymentID: null });
		}
		paymentHandle();
		setFormData({
			startDate: "",
			endDate: "",
			driverRequired: false,
		});
	}, [payment.status]);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (["startDate", "endDate", "driverRequired"].includes(field)) {
			calculateTotalCost({ ...formData, [field]: value });
		}
	};

	const calculateTotalCost = (data) => {
		const { startDate, endDate, driverRequired } = data;
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);
			const hours = Math.ceil((end - start) / (1000 * 60 * 60));
			let cost = hours * car.rentPerHour;
			if (driverRequired) cost += hours * 100;
			setTotalCost(cost);
		}
	};

	// Custom Map Event Component to Handle Location Selection
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
			<Marker
				position={[formData.location.lat, formData.location.lng]}
				icon={customIcon}
			/>
		) : null;
	});

	return (
		<div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
			<div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 relative">
				<div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
					<h1 className="text-3xl font-extrabold text-blue-600 bg-blue-100 py-2 px-4 rounded-full shadow">
						Booking Details
					</h1>
				</div>

				{car ? (
					<div>
						<button
							className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition duration-300"
							onClick={() => navigate("/dashboard")}
						>
							← Back
						</button>

						<div className="overflow-hidden rounded-lg shadow-md">
							<img
								src={car.image}
								alt={car.name}
								className="w-full object-cover transition-transform duration-300 hover:scale-105"
							/>
						</div>

						<div className="mt-6 text-gray-800">
							<h2 className="text-2xl font-semibold text-blue-600">
								{car.name}
							</h2>
							<div className="mt-4 grid grid-cols-2 gap-4">
								<div className="text-sm font-medium text-gray-600">
									<p>
										<span className="font-bold text-gray-800">Capacity:</span>{" "}
										{car.capacity} People
									</p>
									<p>
										<span className="font-bold text-gray-800">Fuel Type:</span>{" "}
										{car.fuelType}
									</p>
								</div>
								<div className="text-sm font-medium text-gray-600">
									<p>
										<span className="font-bold text-gray-800">
											Rent Per Hour:
										</span>{" "}
										₹{car.rentPerHour}
									</p>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<label className="block text-gray-700">
								Start Date:
								<input
									type="date"
									value={formData.startDate}
									min={new Date().toISOString().split("T")[0]} // Restrict past dates
									onChange={(e) =>
										handleInputChange("startDate", e.target.value)
									}
									className="w-full p-2 border rounded-lg mt-1"
								/>
							</label>
							<label className="block text-gray-700 mt-4">
								End Date:
								<input
									type="date"
									value={formData.endDate}
									min={
										formData.startDate || new Date().toISOString().split("T")[0]
									}
									onChange={(e) => handleInputChange("endDate", e.target.value)}
									className="w-full p-2 border rounded-lg mt-1"
								/>
							</label>
							<div className="mt-4  ">
								<label className="block text-gray-700 mt-4 ">
									Select Pickup Location
									<MapContainer
										className=" z-10"
										center={[28.6139, 77.209]}
										zoom={12}
										style={{ marginTop: "1rem", height: 300 }}
									>
										<TileLayer
											url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
										/>
										<LocationPicker />
									</MapContainer>
								</label>
							</div>
							<div className="mt-4">
								<label className="flex items-center text-gray-700">
									<input
										type="checkbox"
										checked={formData.driverRequired}
										onChange={(e) =>
											handleInputChange("driverRequired", e.target.checked)
										}
										className="mr-2"
									/>
									Driver Required (₹100/hour)
								</label>
							</div>
						</div>
						<div className="mt-4 text-xl font-bold text-gray-800">
							Total Cost: ₹{totalCost || "0"}
						</div>
						<div className="mt-8 flex justify-center gap-4">
							<button
								onClick={() => setIsModalOpen(true)}
								className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition duration-300"
							>
								Proceed to Payment
							</button>
							<button
								className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-700 transition duration-300"
								onClick={() => navigate("/dashboard")}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<p className="text-center text-gray-600 text-lg mt-12">
						No car data available. Please return to the dashboard and try again.
					</p>
				)}
			</div>
			{isModalOpen && (
				<PayementModal props={[totalCost, setIsModalOpen, setPayment]} />
			)}
		</div>
	);
};

export default BookingPage;
