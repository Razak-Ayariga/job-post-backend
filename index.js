import express from "express";
import sequelize from "./dataBase/dbConfig.js";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import seedAdmin from "./seeds/superAdminSeed.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(
  helmet(
    helmet({
      contentSecurityPolicy: false
    })
  )
);

const port = process.env.PORT || 4000;

const uploads = multer();

//import routes
import superAdminRoutes from "./seeds/superAdminRoutes.js";
import jobSeekerRoutes from "./routes/jobSeekerRoutes.js";
import profileRoutes from "./routes/jobSeekerProfileRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import companyRegistrationRoutes from "./routes/companyRegistrationRoutes.js";
import postJobRoutes from "./routes/postJobRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import addExperienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import uploadCvRoutes from "./routes/uploadCvRoutes.js";
import jsLinksRoutes from "./routes/jsSocialLinksRoute.js";
import languageRoutes from "./routes/languageRoutes.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import applicationRoutes from "./routes/applicationsRoutes.js";

//use routes
app.use("/superAdmin", superAdminRoutes);
app.use("/jobSeeker", jobSeekerRoutes);
app.use("/jobSeeker", profileRoutes);
app.use("/jobSeeker", addExperienceRoutes);
app.use("/jobSeeker", educationRoutes);
app.use("/jobSeeker", uploadCvRoutes);
app.use("/jobSeeker", jsLinksRoutes);
app.use("/jobSeeker", languageRoutes);
app.use("/jobSeeker", skillsRoutes);
app.use("/jobSeeker", applicationRoutes);
app.use("/company", companyRoutes);
app.use("/company", locationRoutes);
app.use("/company", companyRegistrationRoutes);
app.use("/company", postJobRoutes);

(async () => {
  try {
    await sequelize.authenticate().then(() => seedAdmin());
    console.log("Connection established successfully");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect to the database");
  }
})();
