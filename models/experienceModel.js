import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const experienceModel = sequelize.define("experiencesGain", {
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
        }
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    paranoid: true
});
(async () => {
    await sequelize.sync()
})();

export default experience;