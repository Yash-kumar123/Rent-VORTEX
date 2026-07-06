import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaCalendarCheck, FaArrowRight, FaHome } from "react-icons/fa";

function SuccessPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const transactionId = location.state?.transactionId || "N/A";

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
			<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform hover:scale-[1.02] transition-all duration-300">
				
				{/* Checkmark Icon with Pulse Animation */}
				<div className="flex justify-center mb-6">
					<div className="relative">
						<div className="absolute inset-0 rounded-full bg-green-500 opacity-25 animate-ping"></div>
						<FaCheckCircle className="text-green-400 text-7xl relative z-10" />
					</div>
				</div>

				<h1 className="text-3xl font-extrabold mb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
					Payment Successful!
				</h1>
				<p className="text-gray-300 mb-6 text-sm">
					Thank you for booking with Rent VORTEX. Your booking is confirmed.
				</p>

				{/* Transaction ID Box */}
				<div className="bg-black bg-opacity-30 rounded-xl p-4 mb-8 border border-white border-opacity-10">
					<p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Transaction ID</p>
					<p className="font-mono text-sm text-green-300 truncate">{transactionId}</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col gap-4">
					<button
						onClick={() => navigate("/carbookings")}
						className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95"
					>
						<FaCalendarCheck />
						View My Bookings
						<FaArrowRight className="text-xs ml-1" />
					</button>

					<button
						onClick={() => navigate("/dashboard")}
						className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 text-white font-semibold rounded-xl border border-white border-opacity-15 transition-all duration-300 transform active:scale-95"
					>
						<FaHome />
						Go to Dashboard
					</button>
				</div>
			</div>
		</div>
	);
}

export default SuccessPage;
