import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import cron from "node-cron"
import { Op } from "sequelize";
import companyModel from "../models/companyModel.js";
import companyRegistration from "../models/companyRegistrationModel.js";
import postedJobs from "../models/postJobsModel.js";
// import jobSeeker from "../models/jobSeekerProfileModel.js";
// import Experience from "../models/experienceModel.js";
// import Education from "../models/educationModel.js";
// import Languages from "../models/languageModel.js";
// import Skills from "../models/skillsModel.js";
// import jsSocialLinks from "../models/jsSocialLinksModel.js";
import locations from "../models/locationModel.js";
// import applications from "../models/applicationsModel.js";  

// Company register
const registerCompany = async (req, res) => {
  try {
    const newCompany = req.body;
    // const token = req.token;
    const password = newCompany.password;
    const hashPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const logo = req.file?.filename;
    newCompany["logo"] = logo;
    newCompany["password"] = hashPassword;
    newCompany["uuid"] = uuid;

    const addCompany = await companyModel.create(newCompany, {
      fields: [
        "company_name",
        "password",
        "email",
        "mobile_number",
        "verification_method",
      ],
    });
    const company = addCompany.dataValues;
    res.status(201).json({ message: "Company registered successfully!", company });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register company!" });
  }
};

// Company login
const companyLogin = async (req, res, next) => {
  try {
    const token = req.token;
    const company = req.body;
    if (company) {
      res.status(200).json({message:"Login successful!", token})
    }
    next();
  } catch (error) {
    console.log(error);
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
    if (!findCompany) {
      return res.status(404).json({ message: "No company found!" });
    }
    res.status(201).json({ message: "Updated successfully!", updateResult });
  } catch (error) {
    res.status(400).json({ message: "failed to update!" });
  }
};

//Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const findCompany = await companyModel.findOne({ where: { email: email } });
    if (!findCompany) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const Company = {
      id: findCompany.dataValues.id,
      email: findCompany.dataValues.email,
      password: findCompany.dataValues.password
    };
    res.status(200).json({ message: "User found!", Company });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed verify email!" });
  }
};

//Reset password
const resetPassword = async (req, res) => {
  try {
    const company = req.body;
    if (!company.id || !company.newPassword) {
      return res.status(404).json({ message: "Enter new password" });
    }
    const samePassword = bcrypt.compareSync(company.newPassword, company.password)
    if (samePassword) {
      return res.status(404).json({ message: "Password can not be the same" })
    }
    const password = await bcrypt.hash(company.newPassword, 10);
    const updatePassword = await companyModel.update({ password: password }, { where: { id: company.id } });
    if (updatePassword) {
      res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to reset password" })
  }
}


// get all info of a company
const getCompanyAllInfo = async (req, res) => {
  try {
    const token = req.token;
    let company_id;
    if (req.company_id) {
      company_id = req.company_id;
    } else {
      company_id = req.company.id
    }
    const allCompanyInfo = await companyModel.findAll({
      where: { id: company_id },
      include: [
        {
          model: companyRegistration,
          required: false,
          attributes: { exclude: ["id", "company_id", "deletedAt"] },
        },
        {
          model: postedJobs,
          required: false,
          attributes: { exclude: ["company_id", "deletedAt"] },
        },
        {
          model: locations,
          required: false,
          attributes: { exclude: ["id", "company_id", "deletedAt"] },
        },
      ],
    });
    if (!allCompanyInfo)
      return res.status(400).json({ message: "No information found!" });
    res.status(200).json({ message: "successful!", token, allCompanyInfo });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error getting information!" });
  }
};

//Get posted job info
const companyDetails = async (req, res) => {
  try {
    const allDetails = await companyModel.findAll({
      include: [
        {
          model: postedJobs,
          required: false,
          attributes: {
            exclude: ["deletedAt", "company_id", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: { exclude: ["id", "deletedAt", "createdAt", "updatedAt"] },
    });
    if (!allDetails) {
      return res.status(400).json({ message: "No information found!" });
    }
    res.status(200).json(allDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information" });
  }
};

// get all companies
const getAllcompanies = async (req, res) => {
  try {
    const findAllCompanies = await companyModel.findAll({
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

//company to get all info of a job seeker
// const jobSeekerAllInfo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const allInfo = await jobSeeker.findAll({
//       where: { id: id },
//       include: [
//         {
//           model: Education,
//           required: false,
//           attributes: {
//             exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
//           },
//         },
//         {
//           model: Experience,
//           required: false,
//           attributes: {
//             exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
//           },
//         },
//         {
//           model: Languages,
//           required: false,
//           attributes: {
//             exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
//           },
//         },
//         {
//           model: Skills,
//           required: false,
//           attributes: {
//             exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
//           },
//         },
//         {
//           model: jsSocialLinks,
//           required: false,
//           attributes: {
//             exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
//           },
//         },
//       ],
//       attributes: {
//         exclude: [
//           "id",
//           "js_id",
//           "password",
//           "deletedAt",
//           "createdAt",
//           "updatedAt",
//         ],
//       },
//     });
//     if (!allInfo) {
//       return res.status(400).json({ message: "no information found!" });
//     }
//     res.status(200).json(allInfo);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Error getting information!" });
//   }
// };

// get applicant info
const applicantInfo = async (req, res) => {
  try {
    const company_id = req.params.id;

    const allInfo = await applications.findAll({
      where: { company_id: company_id },
      include: [
        {
          model: postedJobs,
          required: false
        },
        {
          model: jobSeeker,
          required: true
        }
      ]
    });
    if (allInfo) {
      res.status(200).json(allInfo);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information" })
  }
}

// delete a company
const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findCompany = await companyModel.findByPk(id);
    if (!findCompany) {
      return res.status(400).json({ message: "Company not available!" });
    }
    await companyRegistration.destroy({ where: { id: id } });
    await postedJobs.destroy({ where: { company_id: id } });
    await locations.destroy({ where: { company_id: id } });
    await findCompany.destroy();
    res.status(200).json({ message: "Record deleted successfully!" });

//     const performHardDelete = async () => {
//   const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
//   const hardDelete = await companyModel.destroy({
//     where: {
//       deletedAt: { [Op.not]: null },
//       updatedAt: { [Op.lte]: twoMinutesAgo },
//     },
//     force: true,
//     include: [postedJobs, companyRegistration, locations],
//   });
//   if (hardDelete) {
//     console.log('Hard delete completed');
//   }
// };
// cron.schedule('*/2 * * * *', performHardDelete);

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error deleting company!" });
  };
  next();
};
const permanentDelete = async () => {
  try {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const hardDelete = await companyModel.destroy({
      where: {
        deletedAt: { [Op.not]: null },
        updatedAt: { [Op.Ite]: null },
      },
      force: true,
      include: [postedJobs, companyRegistration, locations, applications]
    });
    if (hardDelete) {
      console.log(`Company with ${id} is now permanently deleted!`);
    }
    cron.schedule('*/2 * * * *', twoMinutesAgo);
  } catch (error) {
    console.log(error);
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
}

export {
  registerCompany,
  companyLogin,
  updateCompanyInfo,
  getCompanyAllInfo,
  getAllcompanies,
  deleteCompany,
  // permanentDelete,
  // jobSeekerAllInfo,
  companyDetails,
  applicantInfo,
  verifyEmail,
  resetPassword,
  getAllAvailableJobs
};
