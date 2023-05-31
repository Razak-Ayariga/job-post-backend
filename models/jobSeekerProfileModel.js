import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const jobSeekerProfile = sequelize.define("jobSeekerProfile",{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    
    js_id:{
       type: DataTypes.UUID,
       references: {
            model: "jobSeekers",
            key: "id"
        }
    },

   photo:{
      type: DataTypes.STRING,
      allowNull: true
    },
}, {
    timestamps: false
});
(async() => {
    await sequelize.sync()
})();

export default jobSeekerProfile;