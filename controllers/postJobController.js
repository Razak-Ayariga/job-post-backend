import postJobsModel from "../models/postJobsModel.js";

const postJob = async (req, res) => {
    const addJobInfo = req.body;
    const company_id = req.company_id;
    addJobInfo["company_id"] = company_id;

    try {
        const newJob = await postJobsModel.create(addJobInfo);
        const job = newJob.dataValues;
        if (newJob) {
            return res.status(201).json({ message: "Job posted successfully!", job});
        }
    } catch (error) {
        return res.status(400).json({ message: " Failed to post job!" });
    }
};

export default postJob;