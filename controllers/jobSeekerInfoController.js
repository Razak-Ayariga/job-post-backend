import jobSeekerInfoModel from "../models/jobSeekerInfoModel.js";

const jobSeekerInfoController = async (req, res) => {
    // const { first_name, middle_name, last_name, date_of_birth,gender, git_hub_link, linkedIn_link } = req.body;
    const newInfo = req.body;
    const cv = req.file?.filename;
    const id = req.userId;
    newInfo["cv"] = cv;
    newInfo["js_id"] = id;

    try {
        const newJobSeekerInfo = await jobSeekerInfoModel.create(newInfo);
        if (newJobSeekerInfo) {
            res.status(201).json({ message: "Personal Information added successfully!" })
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Failed to add personal Information!"})
    }
}
export default jobSeekerInfoController;