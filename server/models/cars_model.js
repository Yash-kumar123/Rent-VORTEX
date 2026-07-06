const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
		},
		capacity: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			enum: ["Luxury", "Economy", "SUV", "Comfort"],
		},
		fuelType: {
			type: String,
			required: true,
		},
		rentPerHour: {
			type: Number,
			required: true,
		},
		bookedTimeSlots: [
			{
				from: {
					type: String,
					required: true,
				},
				to: {
					type: String,
					required: true,
				},
			},
		],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			default: null,
		},
		location: {
			lat: { type: Number, default: 28.6139 },
			lng: { type: Number, default: 77.209 },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("cars", carSchema);
