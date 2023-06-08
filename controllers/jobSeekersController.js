import JobSeekersModel from "../models/jobSeekersModel.js";
import Experience from "../models/experienceModel.js";
import Education from "../models/educationModel.js";
import Languages from "../models/languageModel.js";
import Skills from "../models/skillsModel.js";
import jsSocialLinks from "../models/jsSocialLinksModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jobSeeker from "../models/jobSeekersModel.js";

//Job seeker registration
const registerJobSeeker = async (req, res) => {
  try {
    //get job seeker information
    const newJobSeeker = req.body;
    const token = req.token;
    const password = newJobSeeker.password;

    //hash the password
    const hashPassword = await bcrypt.hash(password, 10); // await to wait for the password to finish encrypting
    //add the job seeker to the database
    const uuid = uuidv4();
    const filename = req.file;
    newJobSeeker["uuid"] = uuid;
    newJobSeeker["password"] = hashPassword;
    newJobSeeker["photo"] = filename;

    JobSeekersModel.create(newJobSeeker, {
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
const jobSeekerLogin = async (req, res) => {
  const token = req.token;
  const user = req.user;
  res.status(201).json({ message: "Login successful!", token, user });
};

//get a job seeker
const getJobSeeker = async (req, res) => {
  const id = req.userId;
  const findUser = await JobSeekersModel.findOne({
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
    const findAllJobSeekers = await JobSeekersModel.findAll({
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
    const findJobSeeker = await JobSeekersModel.findAll({
      where: { id: userId },
    });
    if (findJobSeeker) {
      const updateResult = await JobSeekersModel.update(userInfo, {
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
    const userId = req.userId;
    const allInfo = await JobSeekersModel.findAll({
      where: { id: userId },
      include: [
        {
          model: Education,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
          },
        },
        {
          model: Experience,
          required: false,
          attributes: {
            exclude: ["id", "js_id", "deletedAt", "createdAt", "updatedAt"],
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

//delete a job seeker's record
const deleteJobSeeker = async (req, res) => {
  try {
    const userId = req.params.id;
    const findJobSeeker = await jobSeeker.findByPk(userId);
    if (!findJobSeeker) {
      return res.status(404).json({ message: "Record not found" });
    }
    const deleteResults = await jobSeeker.destroy({ where: { id: userId } });
    if (deleteResults) {
      res.status(200).json({ message: "Record deleted successfully!" });
    }
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
