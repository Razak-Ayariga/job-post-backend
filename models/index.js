import sequelize from '../dataBase/dbConfig.js';
import jobSeeker from './jobSeekersModel.js';
import applications from './applicationsModel.js';
import postedJobs from './postJobsModel.js';

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
