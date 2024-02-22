import express from "express";
import setupRouter from "./setup";

const apiRouter = express.Router();

apiRouter.use("/setup", setupRouter);

export { apiRouter };
