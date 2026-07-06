const express = require("express");
const app = express();
const cors = require("cors");

const dbConnect = require("./config/database");
dbConnect();

app.use(express.json());
app.use(cors());
const user = require("./routes/user_auth_routes");
const car = require("./routes/car_routes");
const booking = require("./routes/booking_routes");
app.use("/api/v1", user);
app.use("/api/v1", car);
app.use("/api/v1", booking);

app.get("/", (req, res) => {
	try {
		res.status(200).json({
			message: "Welcome to the API",
			success: true,
			data: {
				name: "Yash Kumar",
				age: 19,
				college: "ABESIT",
			},
		});
		// throw 10
	} catch (err) {
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
			data: err,
		});
		console.log(err);
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
