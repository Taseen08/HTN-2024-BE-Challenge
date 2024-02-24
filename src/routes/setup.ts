import express from "express";
import { seedUserData, seedDeviceData } from "../controllers";
const router = express.Router();

router.post("/import-data", seedUserData);
router.post("/register-devices", seedDeviceData);
export default router;
