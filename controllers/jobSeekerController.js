import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jobSeekerRigistration from "../models/jobSeekerModel.js";
// import jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";
// import Education from "../models/educationModel.js";
// import Experience from "../models/experienceModel.js";
// import Languages from "../models/languageModel.js";
// import Skills from "../models/skillsModel.js";
// import jsSocialLinks from "../models/jsSocialLinksModel.js";

// job seeker registration
const registerJobSeeker = async (req, res) => {
  try {
    const newJobSeeker = req.body;
    const password = newJobSeeker.password;
    const hashPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    newJobSeeker["password"] = hashPassword;
    newJobSeeker["uuid"] = uuid;
    const addJobSeeker = await jobSeekerRigistration.create(newJobSeeker);
    if (addJobSeeker)
      res
        .status(201)
        .json({ message: "Registration successful!", newJobSeeker });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register user!" });
  }
};

// login
const loginJobSeeker = async (req, res) => {
  try {
    // const { email, password } = req.body;
    const token = req.token;
    const userInfo = req.body;
    if (userInfo) {
      res.status(200).json({ message: "Login successful!", token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error login!" });
  }
};

// //get all the information of a job seeker
const getAllInfo = async (req, res) => {
  try {
    let userId;
    if (req.userId) {
      userId = req.userId;
    } else {
      userId = req.user.id;
    }
    // const token = req.token;
    const allInfo = await jobSeekerRigistration.findAll({
      where: { id: userId },
      include: [
        {
          model: jobSeekerProfileModel,
          required: false,
          attributes: {
            exclude: ["js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Education,
          required: false,
          attributes: {
            exclude: ["js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Experience,
          required: false,
          attributes: {
            exclude: ["js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Languages,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Skills,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: jsSocialLinks,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["js_id", "password", "deletedAt", "createdAt", "updatedAt"],
      },
    });
    if (!allInfo) {
      return res.status(400).json({ message: "no information found!" });
    }
    res.status(200).json({ message: "successfull!", allInfo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information!" });
  }
};
//all job seekers
const allJobSeekers = async (req, res) => {
  try {
    const findUsers = await jobSeekerRigistration.findAll({
      include: [
        {
          model: jobSeekerProfileModel,
          required: false,
        },
      ],
    });
    if (!findUsers) {
      res.status(400).json({ message: "No information found!" });
      return;
    }
    res.status(200).json({ message: "Success!", findUsers });
  } catch (error) {
    res.status(500).json({ message: "Error getting information!" });
    console.log(error);
  }
};

//Verify Email
// const verifyEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const findUser = await jobSeeker.findOne({ where: { email: email } });
//     if (!findUser) {
//       return res.status(400).json({ message: "User does not exist" });
//     }
//     const user = {
//       id: findUser.dataValues.id,
//       email: findUser.dataValues.email,
//       password: findUser.dataValues.password,
//     };
//     res.status(200).json({ message: "User found!", user });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Failed verify email!" });
//   }
// };

// //Reset password
const resetPassword = async (req, res) => {
  try {
    const user = req.body;
    if (!user.id || !user.newPassword) {
      return res.status(404).json({ message: "Enter new password" });
    }
    const samePassword = bcrypt.compareSync(user.newPassword, user.password)
    if (samePassword) {
      return res.status(404).json({ message: "Password can not be the same" })
    }
    const password = await bcrypt.hash(user.newPassword, 10);
    const updatePassword = await jobSeeker.update(
      { password: password },
      { where: { id: user.id } }
    );
    if (updatePassword) {
      res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to reset password" })
  }
};
// 
// //delete a job seeker's record
const deleteJobSeeker = async (req, res) => {
  try {
    const userId = req.params.id;
    const findJobSeeker = await jobSeeker.findByPk(userId);
    if (!findJobSeeker) {
      return res.status(404).json({ message: "Record not found" });
    }
    await Education.destroy({ where: { js_id: userId } });
    await Experience.destroy({ where: { js_id: userId } });
    await Languages.destroy({ where: { js_id: userId } });
    await Skills.destroy({ where: { js_id: userId } });
    await jsSocialLinks.destroy({ where: { js_id: userId } });
    await cv.destroy({ where: { js_id: userId } });
    await applications.destroy({ where: { js_id: userId } });
    await findJobSeeker.destroy();
    res.status(200).json({ message: "Record deleted successfully!" });

    setTimeout(async () => {
      const permanentDelete = await jobSeeker.destroy({
        where: { id: userId, deletedAt: { [Op.not]: null } },
        force: true, // Permanently delete the record
        include: [
          Education,
          Experience,
          Skills,
          Languages,
          jsSocialLinks,
          cv,
          applications,
        ],
      });
      if (permanentDelete) {
        console.log(`Record permanently deleted for ID: ${userId}`);
      }
    }, 30 * 24 * 60 * 60 * 1000);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not delete record!" });
  }
};

export {
  registerJobSeeker,
  loginJobSeeker,
  getAllInfo,
  allJobSeekers,
  deleteJobSeeker,
};
