import express from "express";
import { getAllUsers, getUser, updateUser, checkInUser } from "../controllers";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.post("/:userId", updateUser);
router.post("/:userId/check-in", checkInUser);
export default router;
