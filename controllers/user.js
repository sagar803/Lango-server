import Questions from "../models/Questions.js";
import Submission from "../models/Submission.js";

/* progress query */
export const getProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const totalQuestionsCount = await Questions.countDocuments();
    const questionsSolved = await Submission.distinct('questionId', { userId: id, isCorrect: true });
    const percentage = Math.floor((questionsSolved.length/totalQuestionsCount)*100);

    res.status(200).json({
      solved: questionsSolved.length,
      total: totalQuestionsCount,
      percentage
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLeaderboard = async(req, res) => {
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

