import languageModel from "../models/languageModel.js";

const addLanguage = async (req, res) => {
  try {
    const addLanguage = req.body;
    const id = req.userId;
    addLanguage["js_id"] = id;

    // Create a new language record
    const newLanguage = await languageModel.create(addLanguage);
    if (newLanguage) {
      return res
        .status(201)
        .json({ message: "Language added succesfully", newLanguage });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//update language
const updateLanguage = async (req, res) => {
  const updateInfo = req.body;
  try {
    console.log(updateInfo);
    const { id } = req.params;
    const findLang = await languageModel.findByPk(id);
    if (!findLang) {
      return res.status(404).json({ message: "language recored not found!" });
    }
    const updateRecord = await languageModel.update(updateInfo, {
      where: { id: id }
    });
    if (updateRecord) {
      res.status(200).json({ message: "language updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ messaage: "Error updating language" });
  }
};

// Get all language records for a jobseeker
const getAllLanguages = async (req, res) => {
  try {
    const js_id = req.params;
    const languageRecords = await languageModel.findAll({
      where: { js_id: js_id }
    });
    if (!languageRecords) {
      return res.status(404).json({ message: "language not found" });
    }
    return res.json(languageRecords);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//get one lang
const getOneLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const findLanguage = await languageModel.findByPk(id);
    if (!findLanguage) {
      return res.status(404).json({ message: "language not found" });
    }
    res.status(200).json(findLanguage);
  } catch (error) {
    res.status(400).json({ message: "failed to fetch language!" });
  }
};

// Delete an existing language record for a jobseeker
const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLanguage = await languageModel.findByPk(id);
    if (!existingLanguage)
      return res.status(404).json({ message: "language record not found" });
    await existingLanguage.destroy();
    const deleteLanguage = await languageModel.destroy({ where: { id: id } });
    if (deleteLanguage)
      return res.status(200).json({ message: "language deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  addLanguage,
  updateLanguage,
  getAllLanguages,
  getOneLanguage,
  deleteLanguage
};
