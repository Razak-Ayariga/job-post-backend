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
            res.status(201).json({ message: "cv uploaded successfully!", cv })
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Failed to upload cv!"})
    }
}
export default uploadCvController;