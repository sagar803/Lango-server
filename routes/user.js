import express from "express";
import { getProgress, getRankings } from "../controllers/user.js";

const router = express.Router();

router.get("/rankings", getRankings);
router.get("/:id", getProgress);

export default router;