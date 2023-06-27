import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
// import education from "./educationModel.js";
// import experience from "./experienceModel.js";
// import skills from "./skillsModel.js";
// import languages from "./languageModel.js";
// import jsSocialLinks from "./jsSocialLinksModel.js";
// import uploadCvModel from "./uploadCvModel.js";
// import profile from "./jobSeekerProfileModel.js"
// import applications from "../models/applicationsModel.js"

const jobSeekerRigistration = sequelize.define("Job_seeker",
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true
});
(async () => {
   await sequelize.sync();
})();

// jobSeekerRigistration.hasOne(profile, { foreignKey: "js_id", onDelete: "CASCADE" });
// jobSeekerRigistration.hasMany(experience, { foreignKey: "js_id", onDelete:"CASCADE" });
// jobSeekerRigistration.hasMany(education, { foreignKey: "js_id", onDelete: "CASCADE" });
// jobSeekerRigistration.hasMany(skills, { foreignKey: "js_id", onDelete:"CASCADE" });
// jobSeekerRigistration.hasMany(languages, { foreignKey: "js_id", onDelete:"CASCADE" });
// jobSeekerRigistration.hasOne(uploadCvModel, { foreignKey: "js_id", onDelete: "CASCADE" });
// jobSeekerRigistration.hasOne(jsSocialLinks, { foreignKey: "js_id", onDelete: "CASCADE" });
// jobSeekerRigistration.hasMany(applications, { foreignKey: "js_id", onDelete: "CASCADE" });

export default jobSeekerRigistration;