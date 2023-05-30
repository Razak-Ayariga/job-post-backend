import postJobsModel from "../models/postJobsModel.js";

const postJob = async (req, res) => {
    const {
        job_title,
        job_type,
        job_description,
        salary_range,
        application_deadline,
        how_to_apply,
        name_of_poster,
        role,
        contact
    } = req.body;
    
    const companyId = req.companyId;

    try {
        const newJob = await postJobsModel.create({
            companyId,
            job_title,
            job_type,
            job_description,
            salary_range,
            application_deadline,
            how_to_apply,
            name_of_poster,
            role,
            contact
        });
        if (newJob) {
           return res.status(201).json({ message: "Job posted successfully!" })
        }
    } catch (error) {
       return res.status(400).json({ message: " Failed to post job!" })
    }
};

export default postJob;