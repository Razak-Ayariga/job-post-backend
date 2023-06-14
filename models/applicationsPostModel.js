import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import postJobsModel from "./postJobsModel.js";
import jobSeekersModel from "./jobSeekersModel.js";

const applicationsPostModel = sequelize.define(
  "applications",
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
        model: jobSeekersModel,
        key: "id"
      }
    },
    jobs_id: {
      type: DataTypes.UUID,
      references: {
        model: postJobsModel,
        key: "id"
      }
    },
    applications: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    paranoid: true
  }
);

(async () => {
  await sequelize.sync();
})();

jobSeekersModel.hasMany(applicationsPostModel, { foreignKey: "js_id" });
postJobsModel.hasMany(applicationsPostModel, { foreignKey: "jobs_id" });

export default applicationsPostModel;
