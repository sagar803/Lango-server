import express from "express";
import { getProgress, getLeaderboard } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getProgress);
router.get("/leaderboard", getLeaderboard);

export default router;