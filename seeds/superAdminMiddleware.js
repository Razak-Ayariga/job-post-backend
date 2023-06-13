import superAdminModel from "../models/superAdminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const mainAdminToken = async (req, res, next) => {
  try {
    const { email } = req.body

    const superAdmin = await superAdminModel.findOne({
      where: { email },
    });
    if (!superAdmin) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }
    const id = superAdmin.id
    const fullName = superAdmin.fullName;
    const payload = { fullName, email, id }
    // Generate token
    jwt.sign(payload, jwtSecret, (error, token) => {
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
