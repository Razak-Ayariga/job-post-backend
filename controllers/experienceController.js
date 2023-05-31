import experienceModel from "../models/experienceModel.js";

const addExperienceController = async (req, res) => {
    const addExperience = req.body;
    const id = req.userId;
    console.log(id);
    addExperience["js_id"] = id;
    try {
        const newExperience = experienceModel.create(addExperience);
        if (newExperience) {
            res.status(201).json({ message: "Experience added successfully!" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to add experience" });
    }
};

// delete an experience
const deleteExperience = async (req, res) => {
    try {
        const { exp_id }  = req.params;
        const result = await experienceModel.destroy({ where: { exp_id:(exp_id) } });
        if (result !==0) {
            res.status(200).json({ message: "Experience deleted successfully!" });
        } else {
            res.status(404).json({ message: "Experience not found!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to deleted experience!" });
    }
};

export { addExperienceController, deleteExperience };