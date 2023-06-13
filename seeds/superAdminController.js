import superAdmin from "../models/superAdminModel.js";
import bcrypt from "bcrypt";

const mainAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.token;
    const admin = req.body;

    // Check if admin exists
    const foundAdmin = await superAdmin.findOne({ where: { email } });
    if (!foundAdmin) {
      return res.status(403).json({ message: "admin does not exist!" });
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

const changePassword = async () => {
  try {
    const { email, newPassword } = req.body
    const findAdmin = await superAdmin.findOne({ where: { email: email } });
    if (!findAdmin) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    console.log(`Admin password updated successfully`);
  } catch (error) {
    console.error("Failed to update admin password:", error);
  }
};

export { mainAdminLogin, changePassword };
