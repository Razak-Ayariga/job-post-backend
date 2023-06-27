import companyModel from "../models/companyModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
import multer from "multer";
import path from "path";
const absolutePath = path.resolve("./");
import bcrypt from "bcrypt";

const findCompany = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const { company_name, email, mobile_number } = req.body;
    const companyInfo = {
      company_name,
      email,
      mobile_number
    };

    const findCompany = await companyModel.findOne({
      where: { email: companyInfo.email }
=======
    const { email } = req.body;
    const existingCompany = await companyModel.findOne({
      where: { email: email },
>>>>>>> origin/Razak
    });
    if (existingCompany) {
      res.status(400).json({ message: "Company already exists. Please login!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
  next();
};

//log in token
const companyToken = async (req, res, next) => {
  const companyInfo = req.body;
  const findCompany = await companyModel.findOne({
<<<<<<< HEAD
    where: { email: companyInfo.email },
    attributes: { exclude: ["password", "description"] }
  });
=======
    where: { email: companyInfo.email }});
>>>>>>> origin/Razak
  if (!findCompany) {
    res.status(403).json({ message: "Invalid email or password" });
    return;
  };
  const password = companyInfo.password;
  const hashedpassword = findCompany.dataValues.password;
 const passwordMatch = await bcrypt.compare(password, hashedpassword);
  if (!passwordMatch) return res.status(403).json({ message: "Invalid Email or password!" });

  const tokenVariables = {
    id: findCompany.dataValues.id,
    company_name: findCompany.dataValues.company_name,
    email: findCompany.dataValues.email,
  }
  // Generate company login token
  const token = jwt.sign(tokenVariables, jwtSecret, {expiresIn:"1hr"});
  req.token = token;
  req.company = findCompany.dataValues;
  next();
};

// Token verification
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const companyInfo = decodedToken;
    if (companyInfo) {
      req.company_id = companyInfo.id;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Failed to authenticate token!" });
  }
};

//middleware to upload logo
const logoUpload = (destination) => {
  const directory = path.join(absolutePath, destination);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      const filename =
        file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    }
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

export {
<<<<<<< HEAD
  companySignupToken,
  verifyCompanyToken,
  companyLoginToken,
  uploadLogoMiddleware
=======
 findCompany,
  verifyToken,
  companyToken,
  logoUpload,
>>>>>>> origin/Razak
};
