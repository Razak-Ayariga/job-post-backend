import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const superAdmin = sequelize.define("superAdmin", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default superAdmin;
