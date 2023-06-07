import superAdminModel from "../models/superAdminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const mainAdminToken = async (req, res, next) => {
  try {
    const { email } = req.body;

    const superAdmin = await superAdminModel.findOne({
      where: { email },
    });
    if (!superAdmin) {
      res.status(403).json({ message: "Main Admin Only!" });
      return;
    }

    // Generate token
    jwt.sign(email, jwtSecret, (error, token) => {
      if (error) {
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

export default mainAdminToken;
