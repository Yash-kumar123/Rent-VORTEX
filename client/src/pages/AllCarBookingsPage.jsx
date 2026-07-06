import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from "../components/Spinner";

const GetAllBookings = () => {
	const {
		loading,
		setLoading,
		navigate,
		getAllBookings,
		bookings,
		setBookings,
		cancelBooking,
	} = useContext(AppContext);

	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		getAllBookings()
			.then(() => {
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching cars:", err);
				setLoading(false);
			});
	}, []);

	const handleCancelBooking = (bookingId) => {
		setLoading(true);
		cancelBooking(bookingId);
		navigate("/carbookings");
	};

	return (
		<div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
			<div className="flex flex-row justify-between mx-2">
				<button
					onClick={() => navigate("/dashboard")}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-all"
				>
					Back
				</button>
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
					All Bookings
				</h1>
				<div></div>
			</div>

			{/* Loading Spinner */}
			{loading ? (
				<Spinner />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{bookings.length === 0 ? (
						<div className="col-span-full flex items-center justify-center h-64">
							<p className="text-lg font-semibold text-gray-600">
								No Bookings Found
							</p>
						</div>
					) : (
						bookings.map((booking) => {
							return (
								<div
									key={booking._id}
									className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
								>
									<img
										src={booking.car.image}
										alt={booking.car.name}
										loading="lazy"
										className="w-full h-48 object-cover rounded-t-xl"
									/>
									<div className="p-4">
										<div className="flex justify-between items-center">
											<h3
												className="text-lg font-semibold text-gray-800 truncate"
												title={booking.car.name}
											>
												{booking.car.name.length > 20
													? `${booking.car.name.slice(0, 20)}...`
													: booking.car.name}
											</h3>
											<button
												onClick={() => handleCancelBooking(booking._id)}
												className="text-sm text-red-500 hover:underline"
											>
												Cancel Booking
											</button>
										</div>
										<p className="text-sm text-gray-500">
											Customer: {booking.user.name}
										</p>
										<p className="text-sm text-gray-500">
											Rent: ₹{booking.totalAmount}
										</p>
										<p className="text-sm text-gray-500">
											Duration: {booking.totalHours} hours
										</p>
										<p className="text-sm text-gray-500">
											Type: {booking.car.type}
										</p>
										<div className="mt-2 flex items-center justify-between border-t pt-2">
											<span className="text-xs text-gray-400 font-semibold">Status:</span>
											<span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
												booking.status === "Approved"
													? "bg-green-100 text-green-800"
													: booking.status === "Rejected"
													? "bg-red-100 text-red-800"
													: "bg-yellow-100 text-yellow-800"
											}`}>
												{booking.status || "Pending"}
											</span>
										</div>
										<p className="text-sm text-gray-500">
											Location:{" "}
											{booking.location && booking.location.lat && booking.location.lng ? (
												<a
													href={`https://www.google.com/maps?q=${booking.location.lat},${booking.location.lng}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 underline"
												>
													{booking.location.lat.toFixed(4)}, {booking.location.lng.toFixed(4)}
												</a>
											) : (
												"Not Specified"
											)}
										</p>
									</div>
								</div>
							);
						})
					)}
				</div>
			)}
		</div>
	);
};

export default GetAllBookings;
