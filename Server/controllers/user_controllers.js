const connectDB = require("../db/connect");

const userRequest = require("../models/userRequsts");
const registerSchema = require("../models/registerSchema");

const registerRequest = async (req, res) => {
	try {
		// await connectDB();
		const { name, email, password, role } = req.body;
		console.log(req.body);
		const checkEmail1 = await registerSchema.findOne({ email: email });
		const checkEmail2 = await userRequest.findOne({ email: email });
		console.log(checkEmail1);
		// res.send("get registered..");
		if (checkEmail1 || checkEmail2) {
			throw new Error("Email already exists !!");
		} else {
			const user = new userRequest({ name, email, password, role });
			await user.save();
			return res.json({
				msg: "request sended successfully !!",
				success: true,
			});
		}
	} catch (error) {
		return res.json({
			msg: `Something went wrong: ${error}`,
		});
	}
};

const userLogin = async (req, res) => {
	try {
		console.log(req.body);
		const { email, password } = req.body;

		const findUser = await registerSchema.findOne({ email });
		console.log(findUser);
		if (findUser) {
			if (findUser.password == password) {
				return res.status(200).json({
					code: 200,
					msg: "Logged In Successfully.",
					success: true,
					data: {
						username: findUser.name,
						userid: findUser._id,
					},
				});
			} else {
				return res
					.status(200)
					.json({ code: 200, msg: "Invalid Credentials.", success: false });
			}
		} else {
			const findUserRequest = await userRequest.findOne({ email });
			if (findUserRequest) {
				if (findUserRequest.status == "pending") {
					return res.status(200).json({
						code: 200,
						msg: "Your register request not approved yet",
						success: false,
						requestStatus: "pending",
					});
				} else {
					if (findUserRequest.status == "rejected") {
						return res.status(200).json({
							code: 200,
							msg: "Your registration request has been rejected",
							success: false,
							requestStatus: "pending",
						});
					}
				}
			} else {
				return res
					.status(200)
					.json({ code: 200, msg: "User not found.", success: false });
			}
		}
	} catch (error) {
		return res.json({
			code: 200,
			msg: `Something went wrong: ${error}`,
			success: false,
		});
	}
};

module.exports = { registerRequest, userLogin };
