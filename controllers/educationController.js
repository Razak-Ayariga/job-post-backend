import educationModel from "../models/educationModel.js"; // educationModel defined in a separate file
//import jobSeeker from "../models/jobSeekersModel.js";
import jobSeekerModel from "../models/jobSeekersModel.js"; // A jobSeekerModel defined in a separate file


// Create a new education record for a jobseeker
const createEducation = async (req, res) => {
  const addEducation = req.body;
  const id = req.userId;
  addEducation["js_id"] = id;
  try {
    const newEducation = await educationModel.create(addEducation);
    console.log(newEducation);
    if (newEducation) {
      return res.status(201).json({ msg: "Education record created successfully" });
    }
  } catch (error) {
    console.error("Error creating education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




// Get all education records for a jobseeker
const getAllEducation = async (req, res) => {
  try {
    const { edu_id } = req.params;
    const educationRecords = await educationModel.findOne({
      where: { edu_id },
    });
    if (!educationRecords) {
      return res.status(404).json({ error: "Education not found" });
    };
    // const educationRecords = await educationModel.findAll({
    //   where: { jobseekerId: edu_id },
    // });
    return res.json(educationRecords);
  } catch (error) {
    console.error("Error fetching education records:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
};




// Delete an existing education record for a jobseeker
const deleteEducation = async(req, res) =>{
  try {
    const { edu_id } = req.params;
    const existingEducation = await educationModel.findByPk(edu_id);
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
