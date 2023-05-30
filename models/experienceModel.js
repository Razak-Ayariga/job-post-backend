import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const experienceModel = sequelize.define("experience", {
    exp_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    jobSeekerId: {
        type: DataTypes.UUID,
        references: {
            model: "jobSeekers",
            key: "jobSeekerId"
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
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false
    }

});
(async () => {
    await sequelize.sync()
})();

export default experienceModel;
