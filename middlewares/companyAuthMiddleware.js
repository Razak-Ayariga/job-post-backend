import companyModel from "../models/companyModel.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const companyToken = async (req, res, next) => {
  try {
    const { company_email}  = req.body;
    const findCompany = await companyModel.findOne({ where: { company_email:company_email }});
    if (findCompany) {
      res.status(400).json({ message: "Company already exists. Please login!" });
      return;
    }
    
    // generate company token
    jwt.sign(company_email, jwtSecret, (error, token) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "validation error" });
      } else {
        req.token = token;
        next();
      }
    });
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};
// token verification
const verifyCompanyToken = async(req, res, next) => {
  const token = req.headers.token;
if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

 const companyEmail = jwt.verify(token, jwtSecret, (error, companyInfo) => {
    if (error) {
      console.error("Error verifying token:", error);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    return companyInfo;
 })
  
  const companyId = await companyModel.findAll({ where: { company_email: companyEmail }, attributes: ["companyId"] });
  req.companyId = companyId[0].dataValues.companyId;
  next();
};

export { companyToken, verifyCompanyToken };