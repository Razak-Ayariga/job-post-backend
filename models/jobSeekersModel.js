import {DataTypes} from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const jobSeeker = sequelize.define("jobSeekers", {
    
    jobSeekerId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
   
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    middleName:{
        type: DataTypes.STRING,
        allowNull: true
    },

    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    dateOfBirth:{
        type: DataTypes.DATE,
        allowNull: false
    },    
    
    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },    
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true, // to ensure that the email provided is in a valid email format
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: true
    }
    
});

export default jobSeeker;