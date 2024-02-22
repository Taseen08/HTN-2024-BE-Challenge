import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const getSequelizeConfig = (): SequelizeOptions => {
  const config: SequelizeOptions = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: "123456",
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
  };

  return config;
};

const sequelize = new Sequelize(getSequelizeConfig());
// sequelize.addModels([User]);

export { sequelize };
