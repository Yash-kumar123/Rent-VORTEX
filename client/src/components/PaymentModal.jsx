import React, { useState } from "react";

const PaymentModal = (props) => {
	const [amount, setIsModalOpen, setPayment] = props.props;
	const [activeTab, setActiveTab] = useState("card"); // card, upi, cash
	const [processing, setProcessing] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// State for Card form
	const [cardDetails, setCardDetails] = useState({
		name: "",
		number: "",
		expiry: "",
		cvv: "",
	});

	// State for UPI form
	const [upiId, setUpiId] = useState("");

	const handleCardChange = (e) => {
		const { name, value } = e.target;
		setCardDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handlePaymentSubmit = (e) => {
		e.preventDefault();
		setProcessing(true);
		setErrorMessage("");

		// Generate random transaction ID suffix
		const array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		const randId = array[0].toString(16).toUpperCase().substring(0, 8);

		setTimeout(() => {
			let transactionId = "";
			if (activeTab === "card") {
				if (!cardDetails.name.trim() || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
					setErrorMessage("Please fill all card details.");
					setProcessing(false);
					return;
				}
				transactionId = `TXN-CARD-${randId}`;
			} else if (activeTab === "upi") {
				if (!upiId.trim() || !upiId.includes("@")) {
					setErrorMessage("Please enter a valid UPI ID (e.g. name@upi).");
					setProcessing(false);
					return;
				}
				transactionId = `TXN-UPI-${randId}`;
			} else {
				transactionId = `TXN-CASH-${randId}`;
			}

			// Return success payment state
			setPayment({ status: "success", paymentID: transactionId });
			setProcessing(false);
			setIsModalOpen(false);
		}, 1200); // Simulated delay
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
			<div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300">
				<h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide text-center">
					Select Payment Method
				</h2>

				{/* Tab Selector */}
				<div className="flex bg-gray-100 p-1.5 rounded-xl mb-6">
					<button
						type="button"
						onClick={() => { setActiveTab("card"); setErrorMessage(""); }}
						className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
							activeTab === "card"
								? "bg-blue-600 text-white shadow-md"
								: "text-gray-600 hover:text-gray-800"
						}`}
					>
						💳 Card
					</button>
					<button
						type="button"
						onClick={() => { setActiveTab("upi"); setErrorMessage(""); }}
						className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
							activeTab === "upi"
								? "bg-blue-600 text-white shadow-md"
								: "text-gray-600 hover:text-gray-800"
						}`}
					>
						📱 UPI
					</button>
					<button
						type="button"
						onClick={() => { setActiveTab("cash"); setErrorMessage(""); }}
						className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
							activeTab === "cash"
								? "bg-blue-600 text-white shadow-md"
								: "text-gray-600 hover:text-gray-800"
						}`}
					>
						💵 Cash
					</button>
				</div>

				<form onSubmit={handlePaymentSubmit} className="space-y-4">
					{/* Card Tab Content */}
					{activeTab === "card" && (
						<div className="space-y-3">
							<div>
								<label className="block text-gray-700 text-xs font-semibold mb-1">
									Cardholder Name
								</label>
								<input
									type="text"
									name="name"
									placeholder="e.g. John Doe"
									value={cardDetails.name}
									onChange={handleCardChange}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200 focus:outline-none"
									required={activeTab === "card"}
								/>
							</div>
							<div>
								<label className="block text-gray-700 text-xs font-semibold mb-1">
									Card Number
								</label>
								<input
									type="text"
									name="number"
									placeholder="e.g. 4242 4242 4242 4242"
									value={cardDetails.number}
									onChange={handleCardChange}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200 focus:outline-none"
									required={activeTab === "card"}
								/>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="block text-gray-700 text-xs font-semibold mb-1">
										Expiry Date
									</label>
									<input
										type="text"
										name="expiry"
										placeholder="MM/YY"
										value={cardDetails.expiry}
										onChange={handleCardChange}
										className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200 focus:outline-none text-center"
										required={activeTab === "card"}
									/>
								</div>
								<div>
									<label className="block text-gray-700 text-xs font-semibold mb-1">
										CVV / CVC
									</label>
									<input
										type="password"
										name="cvv"
										placeholder="123"
										maxLength="4"
										value={cardDetails.cvv}
										onChange={handleCardChange}
										className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200 focus:outline-none text-center"
										required={activeTab === "card"}
									/>
								</div>
							</div>
						</div>
					)}

					{/* UPI Tab Content */}
					{activeTab === "upi" && (
						<div className="space-y-4">
							<div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
								{/* Simulated QR Code */}
								<div className="w-36 h-36 bg-white border border-gray-300 rounded-lg flex items-center justify-center p-2 mb-2 shadow-sm">
									<img
										src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=rentvortex@upi"
										alt="Scan to pay"
										className="w-full h-full object-contain"
									/>
								</div>
								<span className="text-xs text-gray-500 font-medium">Scan QR to pay ₹{amount}</span>
							</div>

							<div>
								<label className="block text-gray-700 text-xs font-semibold mb-1">
									UPI ID / Virtual Payment Address
								</label>
								<input
									type="text"
									placeholder="e.g. name@upi"
									value={upiId}
									onChange={(e) => setUpiId(e.target.value)}
									className="w-full p-2.5 border rounded-xl text-sm focus:ring focus:ring-blue-200 focus:outline-none"
									required={activeTab === "upi"}
								/>
							</div>
						</div>
					)}

					{/* Cash Tab Content */}
					{activeTab === "cash" && (
						<div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-2">
							<p className="text-sm text-blue-800 font-semibold">Pay on Pickup / Counter</p>
							<p className="text-xs text-blue-600">
								No payment is charged online now. You can pay ₹{amount} in Cash or via card directly at the outlet when you pick up your car.
							</p>
						</div>
					)}

					{errorMessage && <p className="text-red-500 text-xs text-center font-medium">{errorMessage}</p>}

					<div className="flex justify-between pt-2 gap-3">
						<button
							type="submit"
							disabled={processing}
							className={`flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center ${
								processing ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							{processing ? (
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									<span>Processing...</span>
								</div>
							) : activeTab === "cash" ? (
								"Confirm Booking"
							) : (
								`Pay ₹${amount}`
							)}
						</button>
						<button
							type="button"
							onClick={() => setIsModalOpen(false)}
							className="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentModal;
