const express = require("express");
const { quiz, getQuiz } = require("../controller/quizController");
const {authenticate} = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:level')
.post(authenticate,quiz)
.get(authenticate,getQuiz)




module.exports = router;
