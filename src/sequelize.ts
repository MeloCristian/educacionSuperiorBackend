import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();
export const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  port: 5432,
  logging: false,
  define: {
    timestamps: false,
    schema: "script_case",
    freezeTableName: true,
  },
  models: [__dirname + "/models"],
});
