const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");
const Answer = require("../models/answerModel");


const quiz = asyncHandler(async (req, res) => {
  const { question, answers } = req.body;
 
  const { level } = req.params;

  if (!question || !answers) {
    return res.status(204).json({
      message: "Insufficient data",
    });
  }
  try {
    let newQuestion = await Quiz.create({
      question,
      difficulty: level,
    });
    let answer = null;

    if (newQuestion) {
      answer = await Answer.create({
        questionId: newQuestion._id,
        answers: answers.map((answer) => ({
          answerText: answer.text,
          right: answer.right,
        })),
      });
    }

    if (answer) {
      await Quiz.findByIdAndUpdate(answer.questionId, {
        $set: { answer: answer._id },
      });

      res.status(200).json({
        message: "Success",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

const getQuiz = asyncHandler(async (req, res) => {
  
  const { level } = req.params;

  const quiz = await Quiz.aggregate([
    { $match: { difficulty: level } },
    {
      $lookup: {
        from: "answers",
        localField: "answer",
        foreignField: "_id",
        as:"answer"
      },
    },
    {
      $project:{
        "answer._id":0,
        "answer.questionId":0,
        "answer.createdAt":0,
        "answer.updatedAt":0,
        "answer.__v":0
      }
    }
  ]);

const data = quiz.map(({ question, answer:[{answers}] }) => {
  return { question, answers };
});

if(data){
  res.status(200).json({
    success:true,
    data
  })
}

});

module.exports = {
  quiz,
  getQuiz,
 
};
