const express = require("express");
const app = express();
require("dotenv").config();
const {sequelize} = require("./dataBase/dbConfig");
const port = process.env.PORT || 4000;

//body parser
app.use(express.json());

//import routes
const jobSeekerRoutes = require("./routes/jobSeekerRoutes");
const adminRoutes = require("./routes/adminRoutes");


//use routes
app.use("/jobSeeker", jobSeekerRoutes);
app.use("/admin", adminRoutes);



;(async () => {
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


