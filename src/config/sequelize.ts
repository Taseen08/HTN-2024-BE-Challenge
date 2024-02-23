import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";
import { User, Skill, UserSkill } from "../models";

dotenv.config();

const getSequelizeConfig = (): SequelizeOptions => {
  const config: SequelizeOptions = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
  };

  return config;
};

const sequelize = new Sequelize(getSequelizeConfig());
sequelize.addModels([User, Skill, UserSkill]);

export { sequelize };
