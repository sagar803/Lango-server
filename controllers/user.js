import Questions from "../models/Questions.js";
import Submission from "../models/Submission.js";
import User from "../models/User.js";

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

export const getRankings = async(req, res) => {
  try{
    //total no of question
    const totalQuestionsCount = await Questions.countDocuments();
    //question solved by each user in sorted order
    const ranking = await User.find().sort({questionsSolved: -1}).exec();
    const leaderboard = ranking.map((user, index) => ({
      rank: index,
      name: user.fullName,
      solved: user.questionsSolved.length
    }));
    res.status(200).json({result: leaderboard});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

