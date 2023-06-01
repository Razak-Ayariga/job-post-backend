import JobSeekersModel from "../models/jobSeekersModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

//Job seeker registration
const registerJobSeekerController = async (req, res) => {
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
    console.log(newJobSeeker);

    JobSeekersModel.create(newJobSeeker, {fields: ["id","first_name","middle_name","last_name","date_of_birth","gender","email","phone_number"]}).then((response) => {
      const user = response.dataValues
      res.status(201).json({ message: "registered successfully", token, user });
      return;
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to register job seeker" });
  }
};

// job seeker login
const jobSeekerLoginController = async (req, res) => {
  const token = req.token;
  const user = req.user;

  res.status(201).json({ message: "Login successful!", token, user });
};

const getJobSeekerController = async (req, res) => {
  const id = req.userId;
    const findUser = await JobSeekersModel.findOne({ id, attributes: { exclude: ['password'] } });
  if (findUser) {
    return res.status(200).json({ jobseeker: findUser.dataValues });
  } else {
    return res.status(400).json("User not found...");
  }
};

const updateJobSeekerInfo = async (req, res) => {
  try {
    const userInfo = req.body;
    const userId = req.userId;
    const photo = req.file?.filename
    userInfo['photo']=photo
    // console.log(userInfo);
  
    const updateResult = await JobSeekersModel.update(userInfo, { where: { id: userId } });
     const findJobSeeker = await JobSeekersModel.findAll({ where: { id: userId } });
    res.status(201).json({message: "Updated successfully!",findJobSeeker})
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: "failed to update!" });
  }
}
export {
  registerJobSeekerController,
  jobSeekerLoginController,
  getJobSeekerController,
  updateJobSeekerInfo
};
