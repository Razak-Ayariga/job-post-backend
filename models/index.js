import sequelize from '../dataBase/dbConfig.js'
import jobSeeker from './jobSeekersModel.js'; 
import applications from './applicationsModel.js'; 


jobSeeker.hasMany(experience, { foreignKey: "js_id", onDelete:"CASCADE" });
jobSeeker.hasMany(education, { foreignKey: "js_id", onDelete: "CASCADE" });
jobSeeker.hasMany(skills, { foreignKey: "js_id", onDelete:"CASCADE" });
jobSeeker.hasMany(languages, { foreignKey: "js_id", onDelete:"CASCADE" });
jobSeeker.hasOne(uploadCvModel, { foreignKey: "js_id", onDelete: "CASCADE" });
jobSeeker.hasOne(jsSocialLinks, { foreignKey: "js_id", onDelete: "CASCADE" });
jobSeeker.hasMany(applications, { foreignKey: "js_id", onDelete: "CASCADE" });


applications.belongsToMany(jobs, { through: "job_id" });
applications.belongsToMany(companies, { through: "company_id" });
applications.belongsTo(jobSeeker, { through: "js_id" });


(async function test() {
  try {
    await sequelize.sync({ force: true });
  
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();

export {applications,jobSeeker}