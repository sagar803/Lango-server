import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', 
        required: true
    },
    submittedAnswer: {
        type: String, 
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;