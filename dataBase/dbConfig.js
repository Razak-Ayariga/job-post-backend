import  Sequelize  from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
  logging: false
});

(async () => {
  try {
    await import("../seeds/superAdminSeed.js");
  } catch (error) {
    console.error("Failed to seed admin:", error);
  }
})();
const dbClose = () => {
  sequelize.close();
};

export default sequelize;
