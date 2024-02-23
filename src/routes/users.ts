import express from "express";
import { getAllUsers, getUser, updateUser } from "../controllers";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.post("/:userId", updateUser);
export default router;
