import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()
export const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    host: 'postgresql-25946-0.cloudclusters.net',
    port: 25984,
    logging: false,
    define: {
        timestamps: false,
        schema: 'icfes_inicial',
        freezeTableName: true
    },
    models: [__dirname + '/models']
})