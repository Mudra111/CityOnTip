const mongoose = require("mongoose");

const userRequestSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	status: { type: String, default: "pending" },
	requestTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("userRequest", userRequestSchema);
