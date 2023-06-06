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

export default addLanguage;
