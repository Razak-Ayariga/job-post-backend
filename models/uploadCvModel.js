import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const JobSeekerInfo = sequelize.define("cv", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  js_id: {
    type: DataTypes.UUID,
    referneces: {
      model: "jobSeekers",
      key: "id"
    },
<<<<<<< HEAD
    allowNull: false,
    onDelete:"CASCADE"
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: false
  }
=======
    js_id: {
        type: DataTypes.UUID,
        referneces: {
            model: "job_seekers",
            key: "id"
        },
        allowNull: false,
        onDelete:"CASCADE"
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false
    }
>>>>>>> origin/Razak
});
(async() => {
  await sequelize.sync();
})();

export default JobSeekerInfo;


