import superAdmin from "../models/superAdminModel.js";
import companies from "../models/companyModel.js";
import postedJobs from "../models/postJobsModel.js";
import bcrypt from "bcrypt";

const mainAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.token;

    // Check if admin exists
    const foundAdmin = await superAdmin.findOne({ where: { email } });
    if (!foundAdmin) {
      return res.status(403).json({ message: "admin does not exist!" });
    }

    const passwordMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Incorrect email or password" });
    }

    const admin = [foundAdmin.fullName, foundAdmin.email];

    res.status(201).json({ message: "admin logged in!", token, admin });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to log in!" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const email = req.email;
    const findAdmin = await superAdmin.findOne({ where: { email: email } });
    if (!findAdmin) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    // Verify the old password
    const passwordValid = await bcrypt.compare(old_password,findAdmin.password);
    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    findAdmin.password = hashedPassword;
    const saved = await findAdmin.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Failed to update admin password:", error);
  }
};

//Get all companies
const getAllcompanies = async (req, res) => {
  try {
    const findAllCompanies = await companies.findAll({
      attributes: { exclude: ["id", "password", "deletedAt"] },
    });
    if (!findAllCompanies) {
      return res.status(400).json("No companies available!");
    }
    res.status(200).json(findAllCompanies);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can not get all companies!" });
  }
};

// get all job seekers
const getAllJobSeekers = async (req, res) => {
  try {
    const findAllJobSeekers = await jobSeeker.findAll({
      attributes: { exclude: ["id", "password", "deletedAt"] },
    });
    if (!findAllJobSeekers) {
      return res.status(400).json({message: "No job seekers available!"});
    }
    res.status(200).json(findAllJobSeekers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can not get all job seekers!" });
  }
};


// get all available jobs
const getAllAvailableJobs = async (req, res) => {
  try {
    const findAllJobs = await postedJobs.findAll();
    if (findAllJobs) {
      res.status(200).json(findAllJobs);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error geetting all jobs!" });
  }
};

export { mainAdminLogin, changePassword, getAllcompanies , getAllJobSeekers, getAllAvailableJobs };
