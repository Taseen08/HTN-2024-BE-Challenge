import express from "express";
import { getSkillUserCounts } from "../controllers";
const router = express.Router();

router.get("/", getSkillUserCounts);
export default router;
