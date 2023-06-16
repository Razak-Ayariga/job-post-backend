import education from "../models/educationModel.js";

const newEducationController = async (req, res) => {
  try {
    const newEducation = req.body;
    const id = req.userId;
    newEducation["js_id"] = id;

    const addEducation = await education.create(newEducation);
    if (addEducation)
      return res.status(200).json({
        message: "Education record added successfully!",
        addEducation
        //getJobSeekerAllInfo,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to add education record!" });
  }
};

//update education
const updateEducation = async (req, res) => {
  const updateEdu = req.body;
  try {
    console.log(updateEdu);
    const { id } = req.params;
    const findEdu = await education.findByPk(id);
    if (!findEdu) {
      return res.status(404).json({ message: "Education recored not found!" });
    }
    const updateRecord = await education.update(updateEdu, {
      where: { id: id }
    });
    const updatedEdu = await education.findByPk(id);
    if (updateRecord) {
      res
        .status(200)
        .json({ message: "Education updated successfully!", updatedEdu });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ messaage: "Error updating education" });
  }
};

//get one education record
const getOneEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const findEducation = await education.findByPk(id);
    if (!findEducation) {
      return res.status(404).json({ messaage: "Education record not found!" });
    }
    res.status(200).json(findEducation);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error getting education!" });
  }
};

// get all education records
const getAllEducation = async (req, res) => {
  try {
    const findAllEducation = await education.findAll({
      attributes: { exclude: ["id", "js_id", "deletedAt"] }
    });
    if (!findAllEducation) {
      return res.status(404).json({ message: "No education records found!" });
    }
    res.status(200).json(findAllEducation);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error getting all education records!" });
  }
};

// delete an education record
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const findEducation = await education.findByPk(id);
    if (!findEducation) {
      return res.status(404).json({ message: "Education record not found" });
    } else {
      const deleteResults = await education.destroy({ where: { id: id } });
      if (deleteResults) {
        return res
          .status(200)
          .json({ message: "Education record deleted successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error deleting education record!" });
  }
};

export {
  newEducationController,
  updateEducation,
  getOneEducation,
  getAllEducation,
  deleteEducation
};
