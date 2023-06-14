import express from "express";
const app = express();
import "./env.js";
import sequelize from "./dataBase/dbConfig.js";
import cors from "cors";
app.use(cors());
import multer from "multer";
import seedAdmin from "./seeds/superAdminSeed.js";
const port = process.env.PORT || 4000;
import { uploader, cloudinary } from "./cloudinary/cloudinary.js";

app.use(cloudinary);
app.use("/cv", uploader.single("cv"), uploadCvRoutes);

const uploads = multer();

//import routes
import superAdminRoutes from "./seeds/superAdminRoutes.js";
import jobSeekerRoutes from "./routes/jobSeekerRoutes.js";
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
app.use("/jobSeeker", jobSeekerRoutes);
app.use("/superAdmin", superAdminRoutes);
app.use("/company", companyRoutes);
app.use("/companyLocation", locationRoutes);
app.use("/registration", companyRegistrationRoutes);
app.use("/job", postJobRoutes);
app.use("/experience", addExperienceRoutes);
app.use("/education", educationRoutes);
app.use("/cv", uploadCvRoutes);
app.use("/links", jsLinksRoutes);
app.use("/language", languageRoutes);
app.use("/skills", skillsRoutes);
app.use("/application", applicationRoutes);


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
