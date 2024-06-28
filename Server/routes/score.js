const express = require("express");
const {authenticate} = require('../middleware/authMiddleware');
const router = express.Router();
const {score,getScore} = require('../controller/scoreController')
router.route('/')
.post(authenticate,score)
.get(getScore);

module.exports = router;