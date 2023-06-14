import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const locations = sequelize.define(
  "locations",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
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
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    }
  },
  {
    paranoid: true
  }
);

(async () => {
  await sequelize.sync();
})();

export default locations;
