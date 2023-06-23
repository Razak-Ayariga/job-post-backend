import { DataTypes } from "sequelize";
import sequelize from "../dataBase/dbConfig.js";

const jsSocialLinks = sequelize.define("js_social_links", {
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
        onDelete: "CASCADE"
    },

    linkedIn_link: {
        type: DataTypes.STRING,
        //   allowNull: true
    },

    gitHub_link: {
        type: DataTypes.STRING,
        // allowNull: true
    }
});
(async () => {
    await sequelize.sync()
})();

export default jsSocialLinks;