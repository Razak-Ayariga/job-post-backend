import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const jobSeekerProfile = sequelize.define("jobSeekerProfile",{
    profileId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    
    jobSeekerId:{
       type: DataTypes.UUID,
       references: {
            model: "jobSeekers",
            key: "jobSeekerId"
        }
    },

   photo:{
      type: DataTypes.STRING,
      allowNull: true
   },
   
   linkedInLink:{
      type: DataTypes.STRING,
      allowNull: true
   },

   gitHubLink:{
      type: DataTypes.STRING,
      allowNull: false
   }
});
(async() => {
    await sequelize.sync()
})();

export default jobSeekerProfile;