import express from "express";
import { seedUserData } from "../controllers";
const router = express.Router();

router.get("/import-data", seedUserData);
export default router;
