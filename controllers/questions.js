import Questions from "../models/Questions.js";
import Submission from "../models/Submission.js";
import User from "../models/User.js";

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

    // adding solved question to user array if the solution is correct and has not previously solved by user
    const user = await User.findById(userId);

    const isSolved = user.questionsSolved.includes(questionId);
    console.log(questionId);
    console.log(isSolved, 'lol');
    if(isCorrect && !isSolved){
      const user = await User.findById(userId);
      user.questionsSolved.push(questionId);
      await user.save();
    }

    await newSubmission.save();
    res.status(200).json({result: isCorrect});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

