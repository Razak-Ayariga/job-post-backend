import skillsModel from "../models/skillsModel.js"; // SkillsModel defined in a separate file

// Create a new skills record for a jobseeker
const createSkills = async (req, res) => {
  const addSkills = req.body;
  const id = req.userId;
  addSkills["js_id"] = id;
  try {
    const newSkills = await addSkills.create(addSkills);
    console.log(newSkills);
    if (newSkills) {
      return res.status(201).json({ msg: "skills record created successfully" });
    }
  } catch (error) {
    console.error("Error creating skills record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing Skills record for a jobseeker
const updateSkills = async(req, res) => {
  //const { institution_name, degree, field_of_study, start_date, end_date } = req.body;
  

  try {
    const { id } = req.params;
    const existingSkills = await skillsModel.findOne({ where: { id } });
    if (!existingSkills) {
      return res.status(404).json({ error: "Skills record not found" });
    }
    await existingSkills.update(req.body);
    return res.json(existingSkills);
  } catch (error) {
    console.error("Error updating Skills record:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
}

// Get all Skills records for a jobseeker
const getAllSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const skillsRecords = await skillsModel.findOne({
      where: { id },
    });
    if (!skillsRecords) {
      return res.status(404).json({ error: "Skills not found" });
    };
    // const SkillsRecords = await SkillsModel.findAll({
    //   where: { jobseekerId: id },
    // });
    return res.json(skillsRecords);
  } catch (error) {
    console.error("Error fetching Skills records:", error);
    return res.status(500).json({ error: "Internal server error" });
  };
};

// Delete an existing Skills record for a jobseeker
const deleteSkills = async(req, res) =>{
  try {
    const { id } = req.params;
    const existingSkills = await skillsModel.findByPk(id);
    if (!existingSkills) {
      return res.status(404).json({ error: "Skills record not found" });
    }

    await existingSkills.destroy();

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting Skills record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

 

export  { getAllSkills, createSkills, updateSkills, deleteSkills,};

