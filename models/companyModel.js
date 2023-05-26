import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const companies = sequelize.define("Companies", {
  companyId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  company_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  town: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync();
})(); 

export default companies;