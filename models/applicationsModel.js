import DataTypes from "sequelize";
import sequelize from "../dataBase/dbConfig.js";
// import postedJobs from "./postJobsModel.js";
import jobSeeker from "./jobSeekerModel.js";

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
<<<<<<< HEAD
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    paranoid: true
});

=======
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending"
    }
  },
  {
    paranoid: true,
  }
);
>>>>>>> origin/Razak
(async () => {
  await sequelize.sync();
})();

applications.belongsTo(jobSeeker, { foreignKey: "js_id" });
// applications.belongsTo(postedJobs, { foreignKey: "job_id" });

export default applications;
