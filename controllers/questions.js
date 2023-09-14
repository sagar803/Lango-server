import Questions from "../models/Questions.js";
import Submission from "../models/Submission.js";

/* questions query */
export const getQuestions = async (req, res) => {
  try {
    const { language ,level } = req.params;
    console.log(language, level);
    const questions = await Questions.find({level , languageId : language});
    res.status(200).json({ result: questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitAnswer = async(req, res) => {
  try{
    const {questionId, userId, submission} = req.body;
    const question = await Questions.findById(questionId);
    const isCorrect = (question.quiz.correct_option === submission);
    
    const newSubmission = new Submission({
      userId, 
      questionId,
      submittedAnswer: submission,
      isCorrect,
    });
    await newSubmission.save();
    res.status(200).json({result: isCorrect});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

