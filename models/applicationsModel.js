import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import postJob from "./postJobsModel.js";
import jobSeekers from "./jobSeekersModel.js";

const application = sequelize.define(
  "applications",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    js_id: {
      type: DataTypes.UUID,
      references: {
        model: "job_seekers",
        key: "id",
      },
    },
    jobs_id: {
      type: DataTypes.UUID,
      references: {
        model: "postJobs",
        key: "id",
      },
    },
    application: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);
(async () => {
  await sequelize.sync();
})();

jobSeekers.hasMany(application, { foreignKey: "js_id" });

export default application;
