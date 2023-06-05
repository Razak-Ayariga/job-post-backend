import superAdminModel from "../models/superAdminModel.js";
import bcrypt from "bcrypt";

// Admin register
const mainAdminRegister = async (req, res) => {
  try {
    // Get Admin info
    const newAdmin = req.body;
    const token = req.token;
    const password = newAdmin.password;

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    newAdmin["password"] = hashPassword;

    const addAdmin = await superAdminModel.create(newAdmin, {
      fields: ["email", "password"],
    });
    const admin = addAdmin.dataValues;
    res
      .status(201)
      .json({ message: "Admin registered successfully!", token, admin });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to register Admin!" });
  }
};

const mainAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.token;
    const admin = req.body;

    // Check if admin exists
    const foundAdmin = await adminModel.findOne({ where: { email } });
    if (!foundAdmin) {
      return res
        .status(403)
        .json({ message: "admin does not exist. Please register first!" });
    }

    const passwordMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Incorrect email or password" });
    }

    res.status(201).json({ message: "admin logged in!", token, admin });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to log in!" });
  }
};

export { mainAdminRegister, mainAdminLogin };
