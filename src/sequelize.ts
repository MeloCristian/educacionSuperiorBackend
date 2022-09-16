import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import dotenv from "dotenv";
dotenv.config();
export const sequelize = new Sequelize({
  dialect: process.env.DIALECT as Dialect,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  port: parseInt(<string>process.env.DB_PORT, 10) || 5432,
  logging: false,
  define: {
    timestamps: false,
    schema: "public",
    freezeTableName: true,
  },
  models: [__dirname + "/models"],
});
