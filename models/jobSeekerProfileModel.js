import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const jobSeekerProfileModel = sequelize.define(
  "job_seeker_profile",
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
        key: "id"
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "avatar.jpg",
      allowNull: true,
    },
  },
  {
    paranoid: true
  }
);
(async () => {
  await sequelize.sync();
})();

export default jobSeekerProfileModel ;
