import companyModel from "../models/companyModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import companyRegistration from "../models/companyRegistrationModel.js";
import postedJobs from "../models/postJobsModel.js";

// Company register
const registerCompany = async (req, res) => {
  try {
    // Get company info
    const newCompany = req.body;
    const token = req.token;
    const password = newCompany.password;

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const logo = req.file?.filename;
    newCompany["logo"] = logo;
    newCompany["password"] = hashPassword;
    newCompany["uuid"] = uuid;

    const addCompany = await companyModel.create(newCompany, {
      fields: [
        "id",
        "company_name",
        "password",
        "email",
        "mobile_number",
        "verification_method",
      ],
    });
    const company = addCompany.dataValues;
    console.log(company);
    res
      .status(201)
      .json({ message: "Company registered successfully!", token, company });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to register company!" });
  }
};

// Company login
const companyLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.token;
    const company = req.body;

    // Check if company exists
    const findUser = await companyModel.findOne({ where: { email: email } });
    if (!findUser) {
      return res
        .status(403)
        .json({ message: "Company does not exist. Please register first!" });
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Incorrect email or password" });
    }
    res.status(201).json({ message: "company logged in!", token, company });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to log in!" });
  }
};

// update company info
const updateCompanyInfo = async (req, res) => {
  try {
    const companyInfo = req.body;
    const logo = req.file?.filename;
    const company_id = req.company_id;
    companyInfo["logo"] = logo;

    const updateResult = await companyModel.update(companyInfo, {
      where: { id: company_id },
    });
    const findCompany = await companyModel.findAll({
      where: { id: company_id },
    });
    res.status(201).json({ message: "Updated successfully!", findCompany });
  } catch (error) {
    res.status(400).json({ message: "failed to update!" });
  }
};

// get all info of a company
const getCompanyAllInfo = async (req, res) => {
  try {
    const company_id = req.company_id;
    const allCompanyInfo = await companyModel.findAll({
      where: { id: company_id },
      include: [
        { model: companyRegistration, required: false, attributes:{exclude:["id","company_id", "deletedAt"]} },
        { model: postedJobs, required: false,attributes:{exclude:["id","company_id", "deletedAt"]} }
      ],
    });
    if (!allCompanyInfo)
      return req.status(400).json({ message: "No information found!" });
    res.status(200).json(allCompanyInfo);
  } catch (error) {
    console.log(error);
    return res.staus(400).json({ message: "Error getting information!" })
  }
  
};

// get all companies
const getAllcompanies = async (req, res) => {
  try {
    const findAllCompanies = await companyModel.findAll({attributes:{exclude:["id", "password"]}});
    if (!findAllCompanies) {
      return res.status(400).json("No companies available!")
    }
    res.status(200).json(findAllCompanies);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "Can not get all companies!"})
    }
};

export {
  registerCompany,
  companyLoginController,
  updateCompanyInfo,
  getCompanyAllInfo,
  getAllcompanies
};

export { registerCompanyController, companyLoginController, updateCompanyInfo, getCompanyAllInfo };