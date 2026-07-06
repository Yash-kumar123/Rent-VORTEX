const express = require("express");
const router = express.Router();
const {
	bookCar,
	getAllBookings,
	cancelBooking,
	createPaymentIntent,
	getOwnerBookings,
	updateBookingStatus,
} = require("../controllers/booking_controller");

router.post("/bookcar", bookCar);
router.post("/create-payment-intent", createPaymentIntent);
router.get("/getallbookings", getAllBookings);
router.delete("/cancelbooking/:bookingID", cancelBooking);
router.get("/getownerbookings/:ownerId", getOwnerBookings);
router.post("/update-booking-status", updateBookingStatus);

module.exports = router;
