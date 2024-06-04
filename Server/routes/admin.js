const express = require("express");
const router = express.Router();

const register = require("../controllers/admin_controllers");
// const userRequsts = require("../controllers/admin_controllers");

router.route("/register").post((req, res) => {
	register.register(req, res);
});

router.route("/reject").post((req, res) => {
	register.reject(req, res);
});

router.route("/getUserRequests").get((req, res) => {
	register.userRequsts(req, res);
});

module.exports = router;
