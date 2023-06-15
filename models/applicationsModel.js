import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const applications = sequelize.define("applications", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
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
    job_id: {
        type: DataTypes.UUID,
        references: {
            model: "jobs",
            key: "id"
        }
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cover_letter: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    paranoid: true
});

(async () => {
  await sequelize.sync();
})();

applications.belongsTo(jobSeeker, { foreignKey: "js_id" });
applications.belongsTo(jobs, { foreignKey: "job_id" });

export default applications;
