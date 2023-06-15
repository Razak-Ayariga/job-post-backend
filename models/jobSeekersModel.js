import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import education from "./educationModel.js";
import experience from "./experienceModel.js";
import skills from "./skillsModel.js";
import languages from "./languageModel.js";
import jsSocialLinks from "./jsSocialLinksModel.js";
import uploadCvModel from "./uploadCvModel.js";
// import applications from "../models/applicationsModel.js"

const jobSeeker = sequelize.define(
  "job_seeker",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "avatar.jpg",
      allowNull: true
    }
  },
  {
    paranoid: true
  }
);
(async () => {
  await sequelize.sync();
})();

jobSeeker.hasMany(experience, { foreignKey: "js_id", onDelete:"CASCADE" });
jobSeeker.hasMany(education, { foreignKey: "js_id", onDelete: "CASCADE" });
jobSeeker.hasMany(skills, { foreignKey: "js_id", onDelete:"CASCADE" });
jobSeeker.hasMany(languages, { foreignKey: "js_id", onDelete:"CASCADE" });
jobSeeker.hasOne(uploadCvModel, { foreignKey: "js_id", onDelete: "CASCADE" });
jobSeeker.hasOne(jsSocialLinks, { foreignKey: "js_id", onDelete: "CASCADE" });
// jobSeeker.hasMany(applications, { foreignKey: "js_id", onDelete: "CASCADE" });

export default jobSeeker ;
