const { educationModel } = require("../models/educationModel"); // educationModel defined in a separate file
const { jobseekerModel } = require("../models/jobSeekersModel"); // AjobseekerModel defined in a separate file


// Get all education records for a jobseeker
async function getAllEducation(req, res) {
  try {
    const { jobseekerId } = req.params;
    const jobseeker = await jobseekerModel.findByPk(jobseekerId);
    if (!jobseeker) {
      return res.status(404).json({ error: "Jobseeker not found" });
    }

    const education = await educationModel.findAll({
      where: { jobseekerId },
      // Add any additional options or include associations as needed
    });

    return res.json(education);
  } catch (error) {
    console.error("Error fetching education records:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Create a new education record for a jobseeker
async function createEducation(req, res) {
  try {
    const { jobseekerId } = req.params;
    const jobseeker = await jobseekerModel.findByPk(jobseekerId);
    if (!jobseeker) {
      return res.status(404).json({ error: "Jobseeker not found" });
    }

    const newEducation = await educationModel.create({
      // Extract education data from the request body and set the jobseekerId
      // based on the associated jobseeker
      jobseekerId,
      // Add other education properties here based on your education model
    });

    return res.status(201).json(newEducation);
  } catch (error) {
    console.error("Error creating education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Update an existing education record for a jobseeker
async function updateEducation(req, res) {
  try {
    const { educationId } = req.params;
    const existingEducation = await educationModel.findByPk(educationId);
    if (!existingEducation) {
      return res.status(404).json({ error: "Education record not found" });
    }

    // Update the education properties based on the request body
    await existingEducation.update(req.body);

    return res.json(existingEducation);
  } catch (error) {
    console.error("Error updating education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete an existing education record for a jobseeker
async function deleteEducation(req, res) {
  try {
    const { educationId } = req.params;
    const existingEducation = await educationModel.findByPk(educationId);
    if (!existingEducation) {
      return res.status(404).json({ error: "Education record not found" });
    }

    await existingEducation.destroy();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting education record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = { getAllEducation, createEducation, updateEducation, deleteEducation,
};