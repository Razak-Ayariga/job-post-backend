import companyModel from "../models/companyModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const companySignupToken = async (req, res, next) => {
    try {
      const {company_name, company_email, mobile_number, website, region, town} = req.body;
    const companyInfo = {
      company_name,
      company_email,
      mobile_number,
      website,
      region,
      town,
    };
    
    const findCompany = await companyModel.findOne({
      where: { company_email: companyInfo.company_email },
    });
    if (findCompany) {
      res.status(400).json({ message: "Company already exists. Please login!" });
      return;
    }

    // Generate company signup token
    jwt.sign(companyInfo, jwtSecret, (error, token) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "Validation error" });
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

// Token verification
const verifyCompanyToken = async (req, res, next) => {
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
  });

  const companyId = await companyModel.findAll({
    where: { company_email: companyEmail },attributes: ["companyId"],
  });
  req.companyId = companyId[0].dataValues.companyId;
  next();
};

const companyLoginToken = async (req, res, next) => {
  try {
    const { company_email, password } = req.body;
    const findCompany = await companyModel.findAll({
      where: { company_email },
      attributes: { exclude: ["password", "description"] }, // Exclude password and description from the query result
    });

    console.log(findCompany);
    if (!findCompany) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const companyFound = findCompany[0];
    const { companyId, company_name, mobile_number, website, region, town } = companyFound;
    const companyInfo = {
      companyId,
      company_email,
      company_name,
      mobile_number,
      website,
      region,
      town,
    };

    // Generate company login token
    jwt.sign(companyInfo, jwtSecret, (error, token) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "Validation error" });
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

export { companySignupToken, verifyCompanyToken, companyLoginToken };