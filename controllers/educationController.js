import education from "../models/educationModel.js";

const newEducationController = async (req, res) => {
    try {
        const newEducation = req.body;
        const id = req.userId;
        newEducation["js_id"] = id;

        const addEducation = await education.create(newEducation);
        if (addEducation) return res.status(200).json({ message: "Education record added successfully!", addEducation });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to add education record!" })
    }
};

export default newEducationController;