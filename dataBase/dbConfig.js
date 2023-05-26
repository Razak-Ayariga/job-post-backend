import {Sequelize} from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    logging: false
});

const dbClose = ()=>{
    sequelize.close();
}

export default sequelize ;