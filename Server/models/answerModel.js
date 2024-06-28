const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: "quiz",
      required: true,
    },
    answers: [
      {
        answerText: {
          type: String,
          required: true,
        },
        right: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Answer = mongoose.model("answer", answersSchema);

module.exports = Answer;
