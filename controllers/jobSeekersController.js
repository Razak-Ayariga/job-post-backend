
import jobSeeker from "../models/jobSeekersModel.js";
import Experience from "../models/experienceModel.js";
import Education from "../models/educationModel.js";
import Languages from "../models/languageModel.js";
import Skills from "../models/skillsModel.js";
import jsSocialLinks from "../models/jsSocialLinksModel.js";
import cv from "../models/uploadCvModel.js";
import applications from "../models/applicationsModel.js";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

//Job seeker registration
const registerJobSeeker = async (req, res) => {
  try {
    //get job seeker information
    const newJobSeeker = req.body;
    const token = req.token;
    const password = newJobSeeker.password;

    //hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    //add the job seeker to the database
    const uuid = uuidv4();
    const filename = req.file;
    newJobSeeker["uuid"] = uuid;
    newJobSeeker["password"] = hashPassword;
    newJobSeeker["photo"] = filename;

    jobSeeker.create(newJobSeeker, {
      fields: [
        "id",
        "first_name",
        "middle_name",
        "last_name",
        "date_of_birth",
        "password",
        "gender",
        "email",
        "phone",
      ],
    }).then((response) => {
      const user = response.dataValues;

      res.status(201).json({ message: "registered successfully", token, user });
      return;
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to register job seeker" });
  }
};

// job seeker login
const jobSeekerLogin = async (req, res, next) => {

  const token = req.token;
  const user = req.user;
  next();
};

//get a job seeker
const getJobSeeker = async (req, res) => {
  const id = req.userId;
  const findUser = await jobSeeker.findOne({
    id,
    attributes: { exclude: ["password"] },
  });
  if (findUser) {
    return res.status(200).json({ jobseeker: findUser.dataValues });
  } else {
    return res.status(400).json("User not found...");
  }
};

// get all job seekers
const getAllJobSeekers = async (req, res) => {
  try {
    const findAllJobSeekers = await jobSeeker.findAll({
      attributes: { exclude: ["id", "password", "deletedAt"] },
    });
    if (!findAllJobSeekers) {
      return res.status(400).json("No job seekers available!");
    }
    res.status(200).json(findAllJobSeekers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can not get all job seekers!" });
  }
};
// update job seeker info
const updateJobSeekerInfo = async (req, res) => {
  try {
    const userInfo = req.body;
    const userId = req.userId;
    const photo = req.file?.filename;
    userInfo["photo"] = photo;
    const findJobSeeker = await jobSeeker.findAll({
      where: { id: userId },
    });
    if (findJobSeeker) {
      const updateResult = await jobSeeker.update(userInfo, {
        where: { id: userId },
      });
      res.status(201).json({ message: "Updated successfully!", updateResult });
    }
  } catch (error) {
    res.status(400).json({ message: "failed to update!" });
  }
};

//get all the information of a job seeker
const getJobSeekerAllInfo = async (req, res) => {
  try {
    let userId;
    if (req.userId) {
      userId = req.userId;
    } else {
      userId = req.user.id;
    }
    const token = req.token;
    const allInfo = await jobSeeker.findAll({
      where: { id: userId },
      include: [
        {
          model: Education,
          required: false,
          attributes: {
            exclude: [ "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Experience,
          required: false,
          attributes: {
            exclude: [ "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Languages,
          required: false,
          attributes: {
            exclude: [ "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Skills,
          required: false,
          attributes: {
            exclude: [ "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: jsSocialLinks,
          required: false,
          attributes: {
            exclude: [ "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: [
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
    res.status(200).json({ token, allInfo});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information!" });
  }
};

//delete a job seeker's record
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
        where: {id: userId, deletedAt: { [Op.not]: null }},
        force: true, // Permanently delete the record
        include: [Education, Experience, Skills, Languages, jsSocialLinks, cv],
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
  jobSeekerLogin,
  getJobSeeker,
  updateJobSeekerInfo,
  getJobSeekerAllInfo,
  deleteJobSeeker,
  getAllJobSeekers,
};
