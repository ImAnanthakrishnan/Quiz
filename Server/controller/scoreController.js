const Score = require("../models/scoreModel");
const asyncHandler = require("express-async-handler");

const score = asyncHandler(async (req, res) => {
  const { level, score } = req.body;

  if (!level || !score) {
    return res.status(204).json({
      message: "Insufficient data",
    });
  }

  const newScore = await Score.create({
    user: req.userId,
    score,
    difficulty: level,
  });

  if (newScore) {
    res.status(200).json({
      message: "Sucessfull",
    });
  }
});

const getScore = asyncHandler(async (req, res) => {
  const { level } = req.query;

  const scores = await Score.aggregate([
    { $match: { difficulty: level } },
    { $sort: { score: 1 } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $project: {
        "users.name": 1,
        score: 1,
        difficulty: 1
      },
    },
  ]);
  

  if(scores){
    res.status(200).json({
        message:'success',
        data:scores
    })
  }
 
});

module.exports = {
  score,
  getScore,
};
