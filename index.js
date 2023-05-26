import express from "express";
const app = express();
import "./env.js";
import sequelize  from "./dataBase/dbConfig.js";
const port = process.env.PORT || 4000;

//body parser
app.use(express.json());

//import routes
import jobSeekerRoutes from "./routes/jobSeekerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobSeekerProfileRoutes from "./routes/jobSeekerProfileRoute.js";

//use routes
app.use("/jobSeeker", jobSeekerRoutes);
app.use("/admin", adminRoutes);
app.use("/company", companyRoutes);
app.use("/profile", jobSeekerProfileRoutes);

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
