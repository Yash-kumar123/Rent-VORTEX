import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const PaymentModal = (props) => {
	const [amount, setIsModalOpen, setPayment] = props.props;

	const [formData, setFormData] = useState({
		cardName: "",
		cardNumber: "",
		expiryMonth: "",
		expiryYear: "",
		cvv: "",
	});
	const { navigate } = useContext(AppContext);
	const handlePayment = async () => {
		const { cardNumber, expiryMonth, expiryYear, cvv, cardName } = formData;
		if (!cardNumber || !expiryMonth || !expiryYear || !cvv || !cardName) {
			alert("Please fill all payment details.");
			return;
		}
		try {
			const array = new Uint32Array(1);
			window.crypto.getRandomValues(array);
			const paymentID = `PAY-${array[0].toString(16).toUpperCase()}`;
			setPayment({ status: "success", paymentID: paymentID });
			// navigate("/bookin");
		} catch (error) {
			console.error(error);
			setPayment({ status: "failed", paymentID: null });
		}
		setIsModalOpen(false);
		// setFormData({
		// 	cardName: "",
		// 	cardNumber: "",
		// 	expiryMonth: "",
		// 	expiryYear: "",
		// 	cvv: "",
		// });
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
				<h2 className="text-xl font-bold text-gray-800 mb-4">
					Payment Details
				</h2>
				<input
					type="text"
					placeholder="Cardholder Name"
					value={formData.cardName}
					onChange={(e) => handleInputChange("cardName", e.target.value)}
					className="w-full p-2 border rounded-lg mb-4"
				/>
				<input
					type="text"
					placeholder="Card Number"
					value={formData.cardNumber}
					onChange={(e) => handleInputChange("cardNumber", e.target.value)}
					className="w-full p-2 border rounded-lg mb-4"
				/>
				<div className="flex gap-4 mb-4">
					<div className="flex-1">
						<label className="block text-gray-600 text-sm font-medium mb-1">
							Month
						</label>
						<select
							value={formData.expiryMonth || ""}
							onChange={(e) => handleInputChange("expiryMonth", e.target.value)}
							className="w-full p-2 border rounded-lg"
						>
							<option value="">Select Month</option>
							{Array.from({ length: 12 }, (_, i) => (
								<option key={i + 1} value={String(i + 1).padStart(2, "0")}>
									{String(i + 1).padStart(2, "0")}
								</option>
							))}
						</select>
					</div>
					<div className="flex-1">
						<label className="block text-gray-600 text-sm font-medium mb-1">
							Year
						</label>
						<select
							value={formData.expiryYear || ""}
							onChange={(e) => handleInputChange("expiryYear", e.target.value)}
							className="w-full p-2 border rounded-lg"
						>
							<option value="">Select Year</option>
							{Array.from({ length: 50 }, (_, i) => {
								const year = new Date().getFullYear() + i;
								return (
									<option key={year} value={year}>
										{year}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<input
					type="text"
					placeholder="CVV"
					value={formData.cvv}
					onChange={(e) => handleInputChange("cvv", e.target.value)}
					className="w-full p-2 border rounded-lg mb-4"
				/>
				<div className="flex justify-between">
					<button
						onClick={handlePayment}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
					>
						Pay Now
					</button>
					<button
						onClick={() => setIsModalOpen(false)}
						className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentModal;
