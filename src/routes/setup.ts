import express from "express";
import { seedUserData } from "../controllers/setupController";
const router = express.Router();

router.get("/import-data", seedUserData);
export default router;
