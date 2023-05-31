import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const JobSeekerInfo = sequelize.define("jobSeekerInfo", {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gitHub_link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedIn_link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: false
});
(async() => {
    await sequelize.sync();
})();

export default JobSeekerInfo;


