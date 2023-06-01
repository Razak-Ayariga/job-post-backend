import express from "express";
const app = express();
import "./env.js";
import sequelize from "./dataBase/dbConfig.js";
import cors from "cors";
app.use(cors())
import multer from "multer";
const port = process.env.PORT || 4000;

const uploads = multer()

//import routes
import jobSeekerRoutes from "./routes/jobSeekerRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import addExperienceRoutes from "./routes/experienceRoutes.js";
import educarionRoutes from "./routes/educationRoutes.js";
import postJobRoutes from "./routes/postJobRoutes.js";
import uploadCvRoutes from "./routes/uploadCvRoutes.js";
import companyProfileRoutes from "./routes/companyInfoRoutes.js";

//use routes
app.use("/jobSeeker", jobSeekerRoutes);
// app.use(uploads.none())
app.use("/company", companyRoutes);
app.use("/companyProfile", companyProfileRoutes)
app.use("/experience", addExperienceRoutes);
app.use("/education", educarionRoutes);
app.use("/jobPost", postJobRoutes);
app.use("/cv", uploadCvRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect to the database");
  }
})();
