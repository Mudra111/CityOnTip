const connectDB = require("../db/connect");

const registerSchema = require("../models/registerSchema");
const userRequests = require("../models/userRequsts");

const register = async (req, res) => {
	try {
		await connectDB();
		const { name, email, password, role } = req.body;
		console.log(req.body);

		const newData = {
			name: name,
			email: email,
			password: password,
			role: role,
			status: "approved",
		};

		const updatedUser = await userRequests.findOneAndUpdate(
			{ email }, // Search criteria: find user by email
			newData, // New data to update
			{ new: true } // Option to return the updated document
		);
		if (updatedUser) {
			console.log("user request updated...", updatedUser);
		}
		// await getUser.save();
		// const checkEmail = await registerSchema.findOne({ email: email });
		// console.log(checkEmail);
		// // res.send("get registered..");
		// if (checkEmail) {
		// 	throw new Error("Email already exists !!");
		// } else {
		const user = new registerSchema({ name, email, password, role });
		await user.save();
		return res.json({
			msg: "User created successfully !!",
			success: true,
		});
		// }
	} catch (error) {
		return res.json({
			msg: `Something went wrong: ${error}`,
			success: false,
		});
	}
};

const reject = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		console.log(req.body);
		const newData = {
			name: name,
			email: email,
			password: password,
			role: role,
			status: "rejected",
		};

		const updatedUser = await userRequests.findOneAndUpdate(
			{ email }, // Search criteria: find user by email
			newData, // New data to update
			{ new: true } // Option to return the updated document
		);
		if (updatedUser) {
			console.log("user request updated...", updatedUser);
		}
		return res.json({
			msg: "User request rejected successfully !!",
			success: true,
		});
	} catch (error) {
		return res.json({
			msg: `Something went wrong: ${error}`,
			success: false,
		});
	}
};

const userRequsts = async (req, res) => {
	try {
		const userrequests = await userRequests.find();

		if (userrequests == null) {
			res.json({
				msg: "no user requests found",
				userRequest: userrequests,
			});
		} else {
			res.json({
				msg: "requests fetched successfully",
				userRequest: userrequests,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { register, userRequsts, reject };
