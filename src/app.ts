import express, { Request, Response } from "express";
import { sequelize } from "./config";
import { apiRouter } from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

const init = async () => {
  app.use(express.json());

  app.get("/health", (req: Request, res: Response) =>
    res.send("Hello! This is HTN 2024 Backend challenge server!")
  );

  app.use("/", apiRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const server = async () => {
  try {
    // Connect to the database via Sequeliza
    await sequelize.authenticate();
    console.log("Connection to database has been successfully established!");
    await init();
  } catch (error) {
    console.error("Server initilization failed", error);
    process.exit(1);
  }
};

server();
