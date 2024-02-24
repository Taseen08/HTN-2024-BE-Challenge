import express from "express";
import { handleDeviceLending } from "../controllers";
const router = express.Router();

router.post("/:action", handleDeviceLending);
export default router;
