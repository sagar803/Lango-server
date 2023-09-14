import express from "express";
import { getQuestions , submitAnswer } from "../controllers/questions.js";

const router = express.Router();

router.get("/:language/:level", getQuestions);
router.post("/submit", submitAnswer);

export default router;