import { DataTypes } from "sequelize";
import seqlize from "../dataBase/dbConfig.js";
// import { v4 as uuidv4 } from "uuid";

const companyProfile = seqlize.define("companyInfo", {
  profileId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.UUID,
    references: {
      model: "companies",
      key: "id",
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  likedin_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default companyProfile;