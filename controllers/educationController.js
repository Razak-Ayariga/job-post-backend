import educationModel from "../models/educationModel.js"; // educationModel defined in a separate file
import jobSeeker from "../models/jobSeekersModel.js";
import jobSeekerModel from "../models/jobSeekersModel.js"; // A jobSeekerModel defined in a separate file


// Create a new education record for a jobseeker
const createEducation = async(req, res) => {
  const {institution_name, degree, field_of_study, start_date, end_date} = req.body
  const { jobSeekerId } = req.params;
  try {
    const jobseeker = await jobSeekerModel.findByPk(jobSeekerId);
    console.log(jobSeekerId, jobseeker);
    if (!jobseeker) {
      return res.status(404).json({ error: "Jobseeker not found" });
    }
    const newEducation = {
      institution_name,
      degree,
      field_of_study,
      start_date,
      end_date,
      jobSeekerId
    }
    const response = await educationModel.create(newEducation);
    return res.status(201).json({ msg: 'created', response });
  } catch (error) {
    console.error("Error creating education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
};

// Update an existing education record for a jobseeker
const updateEducation = async(req, res) => {
  //const {Institution_name, Degree, Field_of_study, Start_date, End_date} = req.body
  const { Edu_id } = req.params;
  try {
    const existingEducation = await educationModel.findByPk(Edu_id);
    console.log(Edu_id, existingEducation);
    if (!existingEducation) {
      return res.status(404).json({ error: "Education record not found" });
    }
    await existingEducation.update(req.body);
    return res.json(existingEducation);
  } catch (error) {
    console.error("Error updating education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
}

// Get all education records for a jobseeker
const getAllEducation = async(req, res) =>{
  const { jobSeekerId } = req.params;
  try {
    const jobseeker = await jobSeekerModel.findByPk(jobSeekerId);
    console.log(jobSeekerId, jobseeker);
    if (!jobseeker) {
      console.log(error);
      return res.status(404).json({ error: "Jobseeker not found" });
    }
    //  await jobseeker.findAll(req.body);
    return res.status(200).json(jobseeker);
  } catch (error) {
    console.error("Error fetching education records:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
};


// Delete an existing education record for a jobseeker
const deleteEducation = async(req, res) =>{
  try {
    const { Edu_id } = req.params;
    const existingEducation = await educationModel.findByPk(Edu_id);
    if (!existingEducation) {
      return res.status(404).json({ error: "Education record not found" });
    }

    await existingEducation.destroy();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export  {
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};

//module.exports = { getAllEducation }
