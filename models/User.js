import mongoose from "mongoose";
import Language from "./Language.js";
import Question from "./Questions.js";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    primaryLanguage: {
        type: mongoose.Schema.Types.String,
        ref: 'Language',
        default : 'EN'
    },
    progress: [
      {
        language: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Language',
        },
        questionsSolved: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: Question,
          }
        ],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

