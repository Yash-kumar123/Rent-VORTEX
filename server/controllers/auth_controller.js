const bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
	try {
		let { name, email, password, role } = req.body;
		email = email.toLowerCase().trim();
		name = name.toLowerCase().trim();
		// console.log(name, email, password, role);

		const exisitingUser = await User.findOne({ email: email });
		if (exisitingUser) {
			return res.status(404).json({
				success: "failed",
				message: "Email already exists",
			});
		}

		let hashedPassword;

		try {
			hashedPassword = await bcrypt.hash(password, 10);
		} catch (err) {
			console.log(hashedPassword);
			return res.status(500).json({
				success: "failed",
				message: "Error in hashing Password",
			});
			console.log(err);
		}

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});
		return res.status(200).json({
			success: "success",
			message: "User Created Successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: "failed",
			message: "User can not be registered",
		});
	}
};

exports.login = async (req, res) => {
	console.log("Login called");

	try {
		let { email, password } = req.body;
		email = email.toLowerCase().trim();
		// console.log(req.body);

		if (!email || !password) {
			return res.status(400).json({
				success: "failed",
				message: "Please Fill all Details",
			});
		}

		const exisitingUser = await User.findOne({ email: email });
		if (!exisitingUser) {
			return res.status(401).json({
				success: "failed",
				message: "User Not Found",
			});
		}
		const payload = {
			email: exisitingUser.email,
			id: exisitingUser._id,
			role: exisitingUser.role,
		};

		if (await bcrypt.compare(password, exisitingUser.password)) {
			let token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "2h",
			});

			exisitingUser.token = token;
			exisitingUser.password = undefined;

			const options = {
				expries: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

			res.cookie("token", token, options).status(200).json({
				success: "success",
				token,
				exisitingUser,
				message: "User LoggedIn Successfully",
			});
		} else {
			return res.status(403).json({
				success: "false",
				message: "Invalid Password",
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: "failed",
			message: "Login Failiure",
		});
	}
};
