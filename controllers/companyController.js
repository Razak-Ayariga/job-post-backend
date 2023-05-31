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
    newCompany.uuid = uuid;
    newCompany.password = hashPassword;

    await companyModel.create(newCompany);
    res.status(201).json({ message: "Company registered successfully!", token });
  } catch (error) {
    res.status(500).json({ message: "Failed to register company!" });
  }
};

// Company login
const companyLoginController = async (req, res) => {
  try {
    const { company_email, password } = req.body;
    const token = req.token;

    // Check if company exists
    const findUser = await companyModel.findOne({where: { company_email: company_email }, attributes: ["password"]});
    if (!findUser) {
      return res.status(403).json({ message: "Company does not exist. Please register first!" });
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password does not match" });
    }
    const message = {
      message: "Company logged in successfully!",
      token: token,
    };

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in!" });
  }
};

export { registerCompanyController, companyLoginController };