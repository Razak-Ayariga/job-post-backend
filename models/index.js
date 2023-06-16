import sequelize from '../dataBase/dbConfig.js'
import jobSeeker from './jobSeekersModel.js'; 
import applications from './applicationsModel.js'; 
import postedJobs from './postJobsModel.js';

jobSeeker.hasMany(experience, { foreignKey: "js_id" });
jobSeeker.hasMany(education, { foreignKey: "js_id"});
jobSeeker.hasMany(skills, { foreignKey: "js_id"});
jobSeeker.hasMany(languages, { foreignKey: "js_id" });
jobSeeker.hasOne(uploadCvModel, { foreignKey: "js_id" });
jobSeeker.hasOne(jsSocialLinks, { foreignKey: "js_id"});
jobSeeker.hasMany(applications, { foreignKey: "js_id" });

// applications.belongsTo(jobs, { foreignKey: "job_id" });
// applicationModel.belongsToMany(companies, { through: "company_id" });
// applicationModel.belongsTo(jobSeeker, { through: "js_id" });

(async function test() {
  try {
    await sequelize.sync({ force: true });
  
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();

export { applications, postedJobs };
