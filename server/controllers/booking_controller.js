const Booking = require("../models/booking_model");
const Car = require("../models/cars_model");
const User = require("../models/user_model");
const stripe = require("stripe")(
	process.env.STRIPE_SECRET_KEY || "sk_test_51NFtVGSAZAXtdYSkBaDemNewFODLyLvAZ4Cp8oCxI2m1ecvfG2C1cNpm1B6k6lwIQfD2f9Hxt53gG2hNGExnFVK100raNTKWo4"
);

exports.bookCar = async (req, res) => {
	const { token } = req.body;
	try {
		const newbooking = new Booking(req.body);
		await newbooking.save();
		const car = await Car.findOne({ _id: req.body.car });
		const user = await User.findOne({ _id: req.body.user });
		car.bookedTimeSlots.push(req.body.bookedTimeSlots);

		await car.save();
		res.send("Your booking is successfull");
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

exports.getAllBookings = async (req, res) => {
	console.log("Get All Booking Called");

	try {
		const bookings = await Booking.find().populate(["car", "user"]);
		res.send(bookings);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

exports.cancelBooking = async (req, res) => {
	console.log("Cancel Booking Called");

	const { bookingID } = req.params;
	console.log(bookingID);

	try {
		const booking = await Booking.findByIdAndDelete(bookingID);

		if (!booking) {
			return res.status(404).json({
				success: false,
				message: "Booking not found",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Booking successfully canceled",
			data: booking,
		});
	} catch (error) {
		console.error("Error canceling booking:", error);
		return res.status(500).json({
			success: false,
			message: "An error occurred while canceling the booking",
			error: error.message,
		});
	}
};

exports.createPaymentIntent = async (req, res) => {
	const { amount } = req.body;
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100), // amount in paise/cents
			currency: "inr",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.status(200).json({
			success: true,
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Stripe PaymentIntent error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to create Stripe PaymentIntent",
			error: error.message,
		});
	}
};
