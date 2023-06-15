import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
import jobs from "./postJobsModel.js";
import jobSeeker from "./jobSeekersModel.js";
// import education from "./educationModel.js";
// import experience from "./experienceModel.js";
// import languages from "./languageModel.js";
// import skills from "./skillsModel.js";
// import jsSocialLinks from "./jsSocialLinksModel.js";

const applications = sequelize.define("application", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    js_id: {
        type: DataTypes.UUID,
        references: {
            model: "job_seekers",
            key: "id"
        },
        allowNull: false
    },
    job_id: {
        type: DataTypes.UUID,
        references: {
            model: "jobs",
            key: "id"
        },
        allowNull: false
    },
    company_id: {
        type: DataTypes.UUID,
        references: {
            model: "companies",
            key: "id"
        },
        allowNull: false
    },
    cv: {
        type: DataTypes.STRING
    },
    cover_letter: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    paranoid: true
});
(async() => {
    await sequelize.sync();
})();

applications.belongsTo(jobSeeker, { foreignKey: "js_id" });
applications.belongsTo(jobs, { foreignKey: "job_id" });

export default applications;