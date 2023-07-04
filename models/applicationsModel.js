import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import jobSeeker from "./jobSeekerModel.js";

const applications = sequelize.define(
  "application",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    js_id: {
      type: DataTypes.UUID,
      references: {
        model: "job_seekers",
        key: "id"
      },
      allowNull: false
    },
    job_id: {
      type: DataTypes.UUID,
      references: {
        model: "jobs",
        key: "id"
      },
      allowNull: false
    },
    company_id: {
      type: DataTypes.UUID,
      references: {
        model: "companies",
        key: "id"
      },
      allowNull: false
    },
    cv: {
      type: DataTypes.STRING
    },
    cover_letter: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending"
    }
  });
(async () => {
  await sequelize.sync();
})();

applications.belongsTo(jobSeeker, { foreignKey: "js_id" });

export default applications;
