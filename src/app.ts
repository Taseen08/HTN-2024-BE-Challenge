import express, { Request, Response } from "express";
import { sequelize } from "./config";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8000;
// dotenv.config(); //Reads .env file and makes it accessible via process.env

const init = async () => {
  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => res.send("OK!"));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const server = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been successfully established!");
    await init();
  } catch (error) {
    console.error("Server initilization failed", error);
    process.exit(1);
  }
};

server();
