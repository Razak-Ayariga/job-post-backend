import companyModel from "../models/companyModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// Company register
const registerCompanyController = async (req, res) => {
  try {
    // Get company info
    const newCompany = req.body;
    const token = req.token;
    const password = newCompany.password;

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();

    // Add company to the database
    newCompany["uuid"] = uuid
    newCompany["password"] = hashPassword;

    companyModel.create(newCompany)
    .then(() => {
      res.status(201).json({ message: "Company registered successfully!", token });
      return;
      })
    } catch (error) {
    res.status(500).json({ message: "Failed to register company!" });
  }
};

// Company login
const companyLoginController = async (req, res) => {
    const { company_email, password } = req.body;

    // Check if company exists
    const findUser = await companyModel.findOne({where: { company_email:company_email } });
     if (!findUser) {
      return res.status(403).json({ message: "Company does not exist. Please register first!" });
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
   if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password does not match" });
    }
    res.status(200).json({ message: "Login successful!" });
};

export { registerCompanyController, companyLoginController };