require("dotenv").config();
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./db/connect");

const PORT = process.env.PORT || 3000;

const admin_routes = require("./routes/admin");
const user_routes = require("./routes/user");

app.get("/", (req, res) => {
	res.send("I am live..");
});

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use("/cityOnTip/admin", admin_routes);
app.use("/cityOnTip", user_routes);

const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URI);
		app.listen(PORT, () => {
			console.log("Server running on :", PORT);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
