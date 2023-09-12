import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
    languageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
    },
    type: {
        type: String,
        enum: ['mcq', 'image', 'audio'],
        required: true,
    },
    word: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    sentence: {
        type: String,
        required: true,
    },
    helper_text: {
        type: String,
        required: true,
    },
    quiz: {
        question: {
        type: String,
        required: true,
        },
        options: [
        {
            type: String,
            required: true,
        },
        ],
        correct_option: {
        type: Number,
        required: true,
        min: 0,
        max: 3, 
        },
    },
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;