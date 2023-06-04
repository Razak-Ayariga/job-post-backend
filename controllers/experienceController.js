import experience from "../models/experienceModel.js";

const addExperienceController = async (req, res) => {
  const addExperience = req.body;
  const id = req.userId;
  addExperience["js_id"] = id;
  try {
    const newExperience = experience.create(addExperience);
    if (newExperience) {
      res
        .status(201)
        .json({ message: "Experience added successfully!", addExperience });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to add experience" });
  }
};

// get one experience
const getOneExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const findExperience = await experience.findByPk(id);
    if (!findExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(findExperience);
  } catch (error) {
    res.status(400).json({ message: "failed to fetch experience!" });
  }
};

// get all experience
const getAllExperience = async (req, res) => {
  try {
    const js_id = req.params;
    const findAllExperience = await experience.findAll({
      where: { js_id: js_id },
    });
    if (findAllExperience) {
      return res.status(200).json(findAllExperience);
    }
  } catch (error) {
    res.status(400).json({ message: "Error getting experience" });
  }
};
// delete an experience
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const findExperience = await experience.findByPk(id);
    if (!findExperience) {
      return res.status(404).json({ mesaage: "Experience not found!" });
    } else {
      const deleteResults = await experience.destroy({
        where: { id: id },
      });
      if (deleteResults)
        return res
          .status(201)
          .json({ message: "Eperience deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete experience!" });
  }
};

export {
  addExperienceController,
  getOneExperience,
  deleteExperience,
  getAllExperience,
};
