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
        return res.status(400).json({ message: "Error getting education!" })
    }
};

// get all education records
const getAllEducation = async (req, res) => {
    try {
        const js_id = req.params.js_id;
        const findAllEducation = await education.findAll({ where: { js_id: js_id } });
        if (!findAllEducation) {
            return res.status(404).json({ message: "No education records found!" });
        }
        res.status(200).json(findAllEducation);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error getting all education records!" });
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
                return res.status(200).json({ message: "Education record deleted successfully" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error deleting education record!" });
    }
};

export {newEducationController, getOneEducation, getAllEducation, deleteEducation};