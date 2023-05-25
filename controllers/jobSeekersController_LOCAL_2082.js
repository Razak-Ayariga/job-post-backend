const JobSeekersModel = require("../models/jobSeekersModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

//Job seeker registration
const registerJobSeekerController = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
    phoneNumber,
  } = req.body;
  try {
    const token = req.token;

    //hash the password
    const hashPassword = await bcrypt.hashSync(password, 10); // await to wait for the password to finish encrypting
    console.log(hashPassword);
    //add the job seeker to the database
    const newJobSeeker = {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      email,
      password: hashPassword,
      phoneNumber,
    };
    console.log(newJobSeeker);
    // check if job seeker already exists
    const findUser = await JobSeekersModel.findOne({ where: { email: email } });
    if (findUser) {
      res.status(403).json("user already exist. Please login!");
      return;
    }

    JobSeekersModel.create(newJobSeeker).then(() => {
      res.status(201).json({ message: "registered successfully", token });
      return;
    });
  } catch (error) {
    console.log(error);
    console.log("Error creating job seeker!");
    res.status(500).json("failed to register job seeker");
  }
};

// job seeker login
const jobSeekerLoginController = async (req, res) => {
  //get job seeker info from the body
  const { email, password } = req.body;
  //check if job seeker already exists
  const findUser = await JobSeekersModel.findOne({ email, password });
  if (!findUser) {
    res.status(403).json("user does not exist. Please register first!");
    return;
  }
  res.status(201).json("Login successful!");
};

module.exports = { registerJobSeekerController, jobSeekerLoginController };
