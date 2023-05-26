import {DataTypes} from "sequelize";
import { sequelize } from "../dataBase/dbConfig.js";
//import jobSeeker from "./jobSeekersModel";

const education = sequelize.define("Education", {
    
    edu_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
   
    institution_name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    degree:{
        type: DataTypes.STRING,
        allowNull: true
    },

    field_of_study:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    start_date:{
        type: DataTypes.DATE,
        allowNull: false
    },    
    
    end_date:{
        type: DataTypes.DATE,
        allowNull: false
    },

    jobSeekerId: {
        type: DataTypes.STRING,
        references: {
            model: "jobSeeker",
            key: "jobSeekerId"
        }
    }
    
});

(async()=>{
    await sequelize.sync()
})()


export default  education;