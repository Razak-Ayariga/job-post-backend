const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql", 
    logging: false
});

const dbClose = ()=>{
    sequelize.close();
}

module.exports = {sequelize}