import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import api from "../services/api";
import Spinner from "../components/Spinner";

const HostDashboard = () => {
	const { user, navigate } = useContext(AppContext);
	const [cars, setCars] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("earnings"); // earnings, listings, requests

	const fetchHostData = async () => {
		try {
			// 1. Fetch all cars
			const carsRes = await api.get("/getallcars");
			const ownerCars = carsRes.data.filter(
				(car) => car.owner && car.owner === user._id
			);
			setCars(ownerCars);

			// 2. Fetch bookings for cars owned by this host
			const bookingsRes = await api.get(`/getownerbookings/${user._id}`);
			if (bookingsRes.data && bookingsRes.data.success) {
				setBookings(bookingsRes.data.data);
			}
		} catch (err) {
			console.error("Failed to load host dashboard data:", err);
		}
	};

	useEffect(() => {
		if (user && user._id) {
			setLoading(true);
			fetchHostData().finally(() => setLoading(false));
		}
	}, [user]);

	const handleStatusUpdate = async (bookingId, status) => {
		try {
			await api.post("/update-booking-status", { bookingId, status });
			alert(`Booking request has been ${status.toLowerCase()}!`);
			fetchHostData();
		} catch (err) {
			console.error("Failed to update status:", err);
			alert("Failed to update status. Please try again.");
		}
	};

	// Calculate Host Metrics
	const totalListings = cars.length;
	const bookingsCount = bookings.length;
	const grossEarnings = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
	const platformFee = grossEarnings * 0.15; // 15% platform commission
	const netEarnings = grossEarnings - platformFee;

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="p-6 md:p-8 min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-md border border-gray-100 gap-4">
					<div>
						<h1 className="text-3xl font-extrabold text-blue-600">Host Dashboard</h1>
						<p className="text-gray-500 text-sm mt-1">
							Manage your listed vehicles, monitor bookings, and track your host earnings.
						</p>
					</div>
					<div className="flex gap-3">
						<Link
							to="/enlist-car"
							className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition duration-300 transform active:scale-95"
						>
							+ List a New Car
						</Link>
						<Link
							to="/dashboard"
							className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition duration-300"
						>
							Switch to Renter
						</Link>
					</div>
				</div>

				{/* Metrics Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
					<div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
						<span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
							Total Listed Cars
						</span>
						<span className="text-3xl font-black text-gray-800 mt-2">{totalListings}</span>
						<span className="text-xs text-blue-500 mt-1 font-semibold">Active in fleet</span>
					</div>

					<div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
						<span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
							Bookings Received
						</span>
						<span className="text-3xl font-black text-gray-800 mt-2">{bookingsCount}</span>
						<span className="text-xs text-green-500 mt-1 font-semibold">All-time rentals</span>
					</div>

					<div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
						<span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
							Gross Sales
						</span>
						<span className="text-3xl font-black text-gray-800 mt-2">₹{grossEarnings}</span>
						<span className="text-xs text-gray-500 mt-1">Platform fee: 15% (₹{platformFee})</span>
					</div>

					<div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-2xl shadow-md text-white flex flex-col justify-between">
						<span className="text-xs text-blue-100 font-bold uppercase tracking-wider">
							Net Earnings Payout
						</span>
						<span className="text-3xl font-black mt-2">₹{netEarnings}</span>
						<span className="text-xs text-blue-200 mt-1 font-semibold">
							Available for settlement
						</span>
					</div>
				</div>

				{/* Dashboard Navigation Tabs */}
				<div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-full sm:w-fit">
					<button
						type="button"
						onClick={() => setActiveTab("earnings")}
						className={`py-2.5 px-6 text-sm font-semibold rounded-lg transition ${
							activeTab === "earnings"
								? "bg-blue-600 text-white shadow-sm"
								: "text-gray-600 hover:text-gray-800"
						}`}
					>
						📊 Earnings History
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("listings")}
						className={`py-2.5 px-6 text-sm font-semibold rounded-lg transition ${
							activeTab === "listings"
								? "bg-blue-600 text-white shadow-sm"
								: "text-gray-600 hover:text-gray-800"
						}`}
					>
						🚗 Your Listings ({totalListings})
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("requests")}
						className={`py-2.5 px-6 text-sm font-semibold rounded-lg transition ${
							activeTab === "requests"
								? "bg-blue-600 text-white shadow-sm"
								: "text-gray-600 hover:text-gray-800"
						}`}
					>
						📅 Rental Bookings ({bookingsCount})
					</button>
				</div>

				{/* Tab Content Panels */}
				<div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
					{/* Earnings Tab Content */}
					{activeTab === "earnings" && (
						<div className="space-y-4">
							<h3 className="text-lg font-bold text-gray-800 mb-2">Earnings Logs</h3>
							{bookings.length === 0 ? (
								<p className="text-gray-500 text-sm text-center py-6">
									No payout logs available. When a user books one of your cars, earnings will log here.
								</p>
							) : (
								<div className="overflow-x-auto rounded-xl border border-gray-100">
									<table className="w-full text-sm text-left text-gray-500">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50">
											<tr>
												<th className="px-6 py-4">Transaction ID</th>
												<th className="px-6 py-4">Date</th>
												<th className="px-6 py-4">Vehicle</th>
												<th className="px-6 py-4">Gross Amt</th>
												<th className="px-6 py-4">Fee (15%)</th>
												<th className="px-6 py-4">Net Earned</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-100">
											{bookings.map((booking) => {
												const gross = booking.totalAmount || 0;
												const fee = gross * 0.15;
												const net = gross - fee;
												return (
													<tr key={booking._id} className="hover:bg-gray-50">
														<td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">
															{booking.transactionId}
														</td>
														<td className="px-6 py-4">
															{new Date(booking.createdAt).toLocaleDateString()}
														</td>
														<td className="px-6 py-4 font-semibold text-gray-800">
															{booking.car?.name || "Unknown Vehicle"}
														</td>
														<td className="px-6 py-4">₹{gross}</td>
														<td className="px-6 py-4 text-red-500">-₹{fee.toFixed(0)}</td>
														<td className="px-6 py-4 text-green-600 font-bold">₹{net.toFixed(0)}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
						</div>
					)}

					{/* Listings Tab Content */}
					{activeTab === "listings" && (
						<div>
							<h3 className="text-lg font-bold text-gray-800 mb-4">Your Vehicles</h3>
							{cars.length === 0 ? (
								<div className="text-center py-10 space-y-3">
									<p className="text-gray-500 text-sm">You haven't listed any cars yet.</p>
									<Link
										to="/enlist-car"
										className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition"
									>
										Enlist Your First Car
									</Link>
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{cars.map((car) => (
										<div
											key={car._id}
											className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300"
										>
											<div className="h-44 overflow-hidden relative">
												<img
													src={car.image}
													alt={car.name}
													className="w-full h-full object-cover"
												/>
												<div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">
													{car.type}
												</div>
											</div>
											<div className="p-4 space-y-2">
												<h4 className="font-bold text-lg text-gray-800">{car.name}</h4>
												<div className="flex justify-between text-xs text-gray-500 font-semibold">
													<span>Capacity: {car.capacity} Seater</span>
													<span>Fuel: {car.fuelType}</span>
												</div>
												<div className="border-t pt-2 mt-2 flex justify-between items-center">
													<span className="text-sm font-bold text-blue-600">
														₹{car.rentPerHour} / hr
													</span>
													<span className="text-xs text-gray-400">
														ID: ...{car._id.substring(car._id.length - 6)}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{/* Requests Tab Content */}
					{activeTab === "requests" && (
						<div className="space-y-4">
							<h3 className="text-lg font-bold text-gray-800 mb-2">Rental Requests Summary</h3>
							{bookings.length === 0 ? (
								<p className="text-gray-500 text-sm text-center py-6">
									No bookings recorded for your vehicles yet.
								</p>
							) : (
								<div className="overflow-x-auto rounded-xl border border-gray-100">
									<table className="w-full text-sm text-left text-gray-500">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50">
											<tr>
												<th className="px-6 py-4">Renter</th>
												<th className="px-6 py-4">Vehicle</th>
												<th className="px-6 py-4">From</th>
												<th className="px-6 py-4">To</th>
												<th className="px-6 py-4">Hours</th>
												<th className="px-6 py-4">Location</th>
												<th className="px-6 py-4 text-center">Status</th>
												<th className="px-6 py-4 text-center">Actions</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-100">
											{bookings.map((booking) => (
												<tr key={booking._id} className="hover:bg-gray-50">
													<td className="px-6 py-4">
														<div className="font-semibold text-gray-800">
															{booking.user?.name || "Customer"}
														</div>
														<div className="text-xs text-gray-400">
															{booking.user?.email || ""}
														</div>
													</td>
													<td className="px-6 py-4 font-semibold text-gray-800">
														{booking.car?.name || "Unknown Vehicle"}
													</td>
													<td className="px-6 py-4">
														{booking.bookedTimeSlots?.from || "-"}
													</td>
													<td className="px-6 py-4">
														{booking.bookedTimeSlots?.to || "-"}
													</td>
													<td className="px-6 py-4 text-center">
														{booking.totalHours || "-"}
													</td>
													<td className="px-6 py-4 text-xs font-mono">
														{booking.location
															? `${booking.location.lat.toFixed(4)}, ${booking.location.lng.toFixed(4)}`
															: "N/A"}
													</td>
													<td className="px-6 py-4 text-center">
														<span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
															booking.status === "Approved"
																? "bg-green-100 text-green-800"
																: booking.status === "Rejected"
																? "bg-red-100 text-red-800"
																: "bg-yellow-100 text-yellow-800"
														}`}>
															{booking.status || "Pending"}
														</span>
													</td>
													<td className="px-6 py-4 text-center">
														{(booking.status === "Pending" || !booking.status) ? (
															<div className="flex justify-center gap-2">
																<button
																	type="button"
																	onClick={() => handleStatusUpdate(booking._id, "Approved")}
																	className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition"
																>
																	Approve
																</button>
																<button
																	type="button"
																	onClick={() => handleStatusUpdate(booking._id, "Rejected")}
																	className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition"
																>
																	Reject
																</button>
															</div>
														) : (
															<span className="text-xs text-gray-400 font-semibold">Done</span>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HostDashboard;
