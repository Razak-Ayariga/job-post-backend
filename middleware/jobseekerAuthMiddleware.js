import JobSeekerModel from "../models/JobSeekerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
<<<<<<< HEAD
import multer from "multer";
import path from "path";
import cloudinaryConfig from "../cloudinary/cloudinary.js";

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
    phone_number
  } = req.body;
  const jobSeekerInfo = {
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone_number
  };
  try {
    const findUser = await JobSeekersModel.findOne({ where: { email } });
    if (findUser) {
      res.status(403).json({ message: "user already exist. Please login!" });
      return;
=======

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
>>>>>>> origin/Razak
    }
    next();
};

// // token for job seeker log in
const jobseekerToken = async (req, res, next) => {
  const jobSeekerInfo = req.body;
<<<<<<< HEAD
  const findJobSeeker = await JobSeekersModel.findOne({
    where: { email: jobSeekerInfo.email }
=======
  const findJobSeeker = await JobSeekerModel.findOne({
    where: { email: jobSeekerInfo.email },
>>>>>>> origin/Razak
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
<<<<<<< HEAD
    first_name: findJobSeeker.dataValues.first_name,
    middle_name: findJobSeeker.dataValues.middle_name,
    last_name: findJobSeeker.dataValues.last_name,
    email: findJobSeeker.dataValues.email,
    gender: findJobSeeker.dataValues.gender
  };

  const token = jwt.sign(tokenVariables, jwtSecret);
=======
    email:findJobSeeker.dataValues.email
 }
  const token = jwt.sign(tokenVariables, jwtSecret, {expiresIn: "1hr"});
>>>>>>> origin/Razak
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

<<<<<<< HEAD
//middleware to upload photo
const uploadCvMiddleware = (destination) => {
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

  const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    if (mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(new Error("Upload only images!"));
    }
    return;
  };

  const upload = multer({ storage, fileFilter });
  return upload;
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

  return async (req, res, next) => {
    try {
      // Configure Cloudinary
      cloudinaryConfig();

      // Use upload.single() to process the file upload
      upload.single("photo")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
          return res.status(400).json({ message: "Please upload a photo" });
        }

        try {
          // Upload the file to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);

          // Update the req.file object with the Cloudinary URL
          req.file.path = result.secure_url;

          next();
        } catch (error) {
          console.error("Error uploading photo:", error);
          return res.status(500).json({ message: "Failed to upload photo" });
        }
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      return res.status(500).json({ message: "Failed to upload photo" });
    }
  };
};




export {
  jobseekerSignUpToken,
  jobseekerLogInToken,
  verifyJobseekerToken,
  uploadPhotoMiddleware
};
=======
export {findJobSeeker,jobseekerToken,verifyToken};
>>>>>>> origin/Razak
