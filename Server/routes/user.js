const express = require("express");
const router = express.Router();

const registerRequest = require("../controllers/user_controllers");
// const userLogin = require("../controllers/user_controllers");

router.route("/register").post((req, res) => {
	registerRequest.registerRequest(req, res);
});
router.route("/login").post((req, res) => {
	registerRequest.userLogin(req, res);
});
// router.route("/addInformation").post((req, res) => {
// 	addInfo(req, res);
// });

module.exports = router;
