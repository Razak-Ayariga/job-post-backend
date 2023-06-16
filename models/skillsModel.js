import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const skills = sequelize.define("Skills", {
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
    onDelete:"CASCADE"
  },

  skill_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

(async () => {
  await sequelize.sync();
})();

export default skills;