import languages from "../models/languageModel.js";
import languageModel from "../models/languageModel.js";

const addLanguage = async (req, res) => {
  try {
    const addLanguage = req.body;
    const id = req.userId;
    addLanguage["js_id"] = id;

    // Create a new language record
    const newLanguage = await languageModel.create(addLanguage);
    //   console.log(newLanguage);
    if (newLanguage) {
      return res
        .status(201)
        .json({ message: "Language added succesfully", newLanguage });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get all language records for a jobseeker
const getAllLanguages = async (req, res) => {
  try {
    const { id } = req.params;
    const languageRecords = await languageModel.findAll({
      where: { js_id: id },
    });
    if (!languageRecords || languageRecords.length === 0) {
      return res.status(404).json({ error: "language not found" });
    }
    return res.json(languageRecords);
  } catch (error) {
    console.error("Error fetching language records:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

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
      return res.status(404).json({ error: "language record not found" });
    await existingLanguage.destroy();
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting language record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addLanguage, getAllLanguages, getOneLanguage, deleteLanguage };
