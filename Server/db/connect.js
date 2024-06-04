const mongoose = require("mongoose");

uri =
	"mongodb+srv://mudrabhalodiya:i3hHQMxnRP0znG50@cityontipapi.zrbyp9c.mongodb.net/?retryWrites=true&w=majority";

const connectDB = () => {
	console.log("cennect database..");
	return mongoose.connect(uri, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	});
};

module.exports = connectDB;
