import { DataTypes } from "sequelize";
import { sequelize } from "../dataBase/dbConfig";

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
            key: jobSeekerId
        }
    },

   photo:{
      type: DataTypes.BLOB,
      allowNull: true
   },
   
   cv:{
      type: DataTypes.BLOB,
      allowNull: false
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