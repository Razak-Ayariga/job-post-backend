import skillsModel from "../models/skillsModel.js"; 

// Create a new skills record for a jobseeker
const createSkills = async (req, res) => {
  const addSkill = req.body;
  const id = req.userId;
  addSkill["js_id"] = id;
  try {
    const newSkill = await skillsModel.create(addSkill);
    if (newSkill) {
      return res.status(201).json({ message: "skills record created successfully", addSkill });
    }
  } catch (error) {
    console.error("Error creating skills record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing Skills record for a jobseeker
const updateSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const existingSkills = await skillsModel.findByPk(id);
    if (!existingSkills) {
      return res.status(404).json({ error: "Skills record not found" });
    }
    await existingSkills.update(req.body);
    return res.json({
      status: "Skills record updated successfully",
      skills: existingSkills,
    });
  } catch (error) {
    console.error("Error updating Skills record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all Skills records for a jobseeker
const getAllSkills = async (req, res) => {
  try {
    // const { id } = req.params;
    const skillsRecords = await skillsModel.findAll({attributes:{exclude:["id","js_id","deletedAt"]} });
    if (!skillsRecords || skillsRecords.length === 0) {
      return res.status(404).json({ error: "Skills not found" });
    }
    return res.json(skillsRecords);
  } catch (error) {
    console.error("Error fetching Skills records:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
};

// Delete an existing Skills record for a jobseeker
const deleteSkill = async(req, res) =>{
  try {
    const { id } = req.params;
    const existingSkill = await skillsModel.findByPk(id);
    if (!existingSkill) return res.status(404).json({ error: "Skills record not found" });
    await existingSkill.destroy();
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting Skills record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export  { getAllSkills, createSkills, updateSkills, deleteSkill,};
