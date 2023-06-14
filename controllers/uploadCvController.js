import uploadCvModel from "../models/uploadCvModel.js";

const uploadCvController = async (req, res) => {
  const addCv = req.body;
  const cv = req.file?.filename;
  const id = req.userId;
  addCv["cv"] = cv;
  addCv["js_id"] = id;

  try {
    const newCv = await uploadCvModel.create(addCv);
    if (newCv) {
      res.status(201).json({ message: "cv uploaded successfully!", cv });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Failed to upload cv!" });
  }
};

// update cv
const updateCv = async (req, res) => {
  try {
    const newCv = req.body;
    const { id } = req.params;
    const findCv = await uploadCvModel.findByPk(id);
    if (!findCv) {
      return res.status(404).json({ message: "No cv found!" });
    }
    const updateResults = await uploadCvModel.update(newCv,{ where: { id: id } });
    if (updateResults) {
      res.status(200).json({ message: "Cv updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to update cv" });
  }
}
export { uploadCvController, updateCv };
