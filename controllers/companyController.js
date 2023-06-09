import companyModel from "../models/companyModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
// import companyRegistration from "../models/companyRegistrationModel.js";
// import postedJobs from "../models/postJobsModel.js";
import jobSeeker from "../models/jobSeekersModel.js";
import Experience from "../models/experienceModel.js";
import Education from "../models/educationModel.js";
import Languages from "../models/languageModel.js";
import Skills from "../models/skillsModel.js";
import jsSocialLinks from "../models/jsSocialLinksModel.js";

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
        // "id",
        "company_name",
        "password",
        "email",
        "mobile_number",
        "verification_method",
      ]
    });
    const company = addCompany.dataValues;
    // console.log(company);
    res
      .status(201)
      .json({ message: "Company registered successfully!", token, company });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to register company!" });
  }
};

// Company login
const companyLogin = async (req, res) => {
  try {
    const {email}  = req.body;
    const token = req.token;
    const company = req.body;

    // Check if company exists
    const findUser = await companyModel.findOne({ where: { email: email } });
    if (!findUser) {
      return res
        .status(403)
        .json({ message: "Company does not exist. Please register first!" });
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
    if (updateResult) {
      res.status(201).json({ message: "Updated successfully!", findCompany });
    }
  } catch (error) {
    res.status(400).json({ message: "failed to update!" });
  }
};

// get all info of a company
// const getCompanyAllInfo = async (req, res) => {
//   try {
//     const company_id = req.company_id;
//     const allCompanyInfo = await companyModel.findAll({
//       where: { id: company_id },
//       include: [
//         {
//           model: companyRegistration,
//           required: false,
//           attributes: { exclude: ["id", "company_id", "deletedAt"] },
//         },
//         {
//           model: postedJobs,
//           required: false,
//           attributes: { exclude: ["id", "company_id", "deletedAt"] },
//         },
//       ],
//     });
//     if (!allCompanyInfo)
//       return req.status(400).json({ message: "No information found!" });
//     res.status(200).json(allCompanyInfo);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: "Error getting information!" });
//   }
// };

// get all companies
const getAllcompanies = async (req, res) => {
  try {
    const findAllCompanies = await companyModel.findAll({
      attributes: { exclude: ["id", "password", "deletedAt"] }
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

//company to get all info of a job seeker
const jobSeekerAllInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const allInfo = await jobSeeker.findAll({
      where: { id: id },
      include: [
        {
          model: Education,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          }
        },
        {
          model: Experience,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          }
        },
        {
          model: Languages,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          }
        },
        {
          model: Skills,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          }
        },
        {
          model: jsSocialLinks,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          }
        }
      ],
      attributes: {
        exclude: [
          "id",
          "js_id",
          "password",
          "deletedAt",
          "createdAt",
          "updatedAt",
        ],
      },
    });
    if (!allInfo) {
      return res.status(400).json({ message: "no information found!" });
    }
    res.status(200).json(allInfo);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information!" });
  }
};

// delete a company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const findCompany = await companyModel.findByPk(id);
    if (!findCompany) {
      return res.status(400).json({ message: "Company not available!" });
    }
    const deleteResults = await companyModel.destroy({ where: { id: id } });
    if (deleteResults) {
      return res
        .status(200)
        .json({ message: "Company record deleted successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error deleting company!" });
  }
};

export {
  registerCompany,
  companyLogin,
  updateCompanyInfo,
  // getCompanyAllInfo,
  getAllcompanies,
  deleteCompany,
  jobSeekerAllInfo
};
