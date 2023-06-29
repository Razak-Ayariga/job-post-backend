import JobSeekerModel from "../models/jobSeekerModel.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// //middleware to check if job seeker exists in the database
const findJobSeeker = async (req, res, next) => {
    try {
        const { email } = req.body;
        const findUser = await JobSeekerModel.findOne({ where: { email } });
        if (findUser) {
            res.status(403).json({ message: "user already exist. Please login!" });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to register job seeker" });
    }
    next();
};

// // token for job seeker log in
const jobseekerToken = async (req, res, next) => {
  const jobSeekerInfo = req.body;
  const findJobSeeker = await JobSeekerModel.findOne({
    where: { email: jobSeekerInfo.email },
  });
  if (!findJobSeeker) {
    return res.status(403).json({ message: "Invalid email or password!" });
  }
  const passwordMatch = await bcrypt.compare(
    jobSeekerInfo.password,
    findJobSeeker.password
  );
  if (!passwordMatch) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
  const tokenVariables = {
    id: findJobSeeker.dataValues.id,
    email:findJobSeeker.dataValues.email
 }
  const token = jwt.sign(tokenVariables, jwtSecret, {expiresIn: "1hr"});
  req.token = token;
  req.user = findJobSeeker.dataValues;
  next();
};

// middleware to verify token
const verifyToken = async (req, res, next) => {
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

export {findJobSeeker,jobseekerToken,verifyToken};
