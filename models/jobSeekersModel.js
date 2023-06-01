import {DataTypes} from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const jobSeeker = sequelize.define("jobseekers", {
    
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
   
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    middle_name: {
        type: DataTypes.STRING,
        allowNull: true
    },

    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true, // to ensure that the email provided is in a valid email format
        }
    },
    
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
   
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'avatar.jpg'
    }

}, {
    timestamps: false
});

export default jobSeeker;