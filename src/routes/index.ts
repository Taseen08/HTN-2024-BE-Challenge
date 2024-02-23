import express from "express";
import setupRouter from "./setup";
import userRouter from "./users";
import skillsRouter from "./skills";

const apiRouter = express.Router();

apiRouter.use("/setup", setupRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/skills", skillsRouter);

export { apiRouter };
