import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import applications from "./applicationsModel.js";
// import companies from "./companyModel.js";

const postedJobs = sequelize.define(
  "Jobs",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    company_id: {
      type: DataTypes.UUID,
      references: {
        model: "companies",
        key: "id"
      }
    },

    job_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary_range: {
      type: DataTypes.STRING,
      allowNull: false
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false
    },

    requirements: {
      type: DataTypes.STRING,
      allowNull: false
    },
    application_deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    how_to_apply: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_of_poster: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active"
    }
  },
  {
    paranoid: true
  }
);

postedJobs.hasMany(applications, { foreignKey: "job_id" });

export default postedJobs;
