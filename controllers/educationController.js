import educationModel from "../models/educationModel.js"; // educationModel defined in a separate file
//import jobSeeker from "../models/jobSeekersModel.js";
import jobSeekerModel from "../models/jobSeekersModel.js"; // A jobSeekerModel defined in a separate file


// Create a new education record for a jobseeker
const createEducation = async (req, res) => {
  const { institution_name, degree, field_of_study, start_date, end_date } =
    req.body;
  try {
    // Check if the education record already exists for the jobseeker
    const existingEducation = await educationModel.findOne({
      where: {
        institution_name,
        certification,
        field_of_study,
        start_date,
        end_date,
        jobSeekerId: req.params.jobSeekerId, // Assuming the job seeker ID is passed as a route parameter
      },
    });

    if (existingEducation) {
      return res.status(403)
        .json({ message: "Education record already exists!" });
    }

    // Create a new education record
    const newEducation = await educationModel.create({
      jobSeekerId: req.params.jobSeekerId,
      institution_name,
      certification,
      field_of_study,
      start_date,
      end_date,
      // Assuming the job seeker ID is passed as a route parameter
    });

    if (newEducation) {
      return res
        .status(201)
        .json({ msg: "Education record created successfully" });
    }
  } catch (error) {
    console.error("Error creating education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



// Update an existing education record for a jobseeker
const updateEducation = async(req, res) => {
  //const { institution_name, degree, field_of_study, start_date, end_date } = req.body;
  
  
  try {
    const { edu_id } = req.params;
    const existingEducation = await educationModel.findOne({ where: { edu_id } });
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
