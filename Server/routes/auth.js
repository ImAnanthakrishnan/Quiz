const express = require("express");
//const { authenticate } = require('../middleware/authMiddleware');
const { signUp, signIn } = require("../controller/authController");

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

module.exports = router;
