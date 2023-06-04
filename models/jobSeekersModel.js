import {DataTypes} from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import experience from "./experienceModel.js";
import education from "./educationModel.js";
import skills from "./skillsModel.js";
import languages from "./languageModel.js";

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
            isEmail: true
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
        defaultValue: 'avatar.jpg'
    }
});

jobSeeker.hasMany(experience, { foreignKey: "js_id" });
jobSeeker.hasMany(education, { foreignkey: "js_id" });
jobSeeker.hasMany(skills, { foreignKey: "js_id" });
jobSeeker.hasMany(languages, { foreignkey: "js_id" });

export default jobSeeker;