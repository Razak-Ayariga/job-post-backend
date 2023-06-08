import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import companyRegistration from "./companyRegistrationModel.js";
import postJob from "./postJobsModel.js";

const companies = sequelize.define(
  "Companies",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
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
    verification_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

(async () => {
  await sequelize.sync();
})();

companies.hasMany(postJob, { foreignKey: "company_id" });
companies.hasOne(companyRegistration, { foreignKey: "company_id" });

export default companies;
