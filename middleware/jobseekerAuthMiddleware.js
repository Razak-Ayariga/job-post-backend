import JobSeekersModel from "../models/jobSeekersModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
import multer from "multer";
import path from "path";
// import { log } from "util";
const absolutePath = path.resolve("./");

//middleware to check if job seeker exists in the database and generate a JWT
const jobseekerSignUpToken = async (req, res, next) => {
  const {
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone_number,
  } = req.body;
  const jobSeekerInfo = {
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone_number,
  };
  try {
    const findUser = await JobSeekersModel.findOne({ where: { email } });
    if (findUser) {
      res.status(403).json("user already exist. Please login!");
      return;
    }
    // generate a token for job seeker registeration
    jwt.sign(jobSeekerInfo, jwtSecret, (error, token) => {
      if (error) {
        return res.status(400).json({ message: " validation error" });
      } else {
        req.token = token;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to register job seeker" });
  }
};

// token for job seeker log in
const jobseekerLogInToken = async (req, res, next) => {
  const jobSeekerInfo = req.body;
  const findJobSeeker = await JobSeekersModel.findOne({
    where: { email: jobSeekerInfo.email },
  });
  if (!findJobSeeker) {
    return res.status(403).json({ message: "Invalid email or password!" });
  }
  const tokenVariables = { 
    id:findJobSeeker.dataValues.id ,
    first_name: findJobSeeker.dataValues.first_name,
    middle_name: findJobSeeker.dataValues.middle_name,
    last_name: findJobSeeker.dataValues.last_name,
    email: findJobSeeker.dataValues.email,
    gender:findJobSeeker.dataValues.gender,
  }
    const token = jwt.sign(tokenVariables, jwtSecret);
  req.token = token;
  req.user = findJobSeeker.dataValues;
  next();
};

// middleware to verify token
const verifyJobseekerToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodedToken = jwt.verify(token, jwtSecret);
    const jobSeekerInfo = decodedToken;
    if (jobSeekerInfo) {
      req.userId = jobSeekerInfo.id;
      next();

    }
  } catch (error) {
    console.error("error verifying token");
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
};

//middleware to upload photo
const uploadPhotoMiddleware = (destination) => {
  const directory = path.join(absolutePath, destination);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      const filename =
        file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    },
  });

  const upload = multer({ storage });
  return upload;
};

export {
  jobseekerSignUpToken,
  jobseekerLogInToken,
  verifyJobseekerToken,
  uploadPhotoMiddleware,
};
