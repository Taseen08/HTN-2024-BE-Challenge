import express from "express";
import { seedUserData, seedDeviceData } from "../controllers";
const router = express.Router();

router.get("/import-data", seedUserData);
router.get("/register-devices", seedDeviceData);
export default router;
