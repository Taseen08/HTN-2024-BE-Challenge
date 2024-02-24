import express from "express";
import { getSkillUserCounts, getTeamMatching } from "../controllers";
const router = express.Router();

router.get("/", getSkillUserCounts);
router.get("/:skill/team-match", getTeamMatching);
export default router;
