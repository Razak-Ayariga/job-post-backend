import postedJobs from "../models/postJobsModel.js";
import postJobsModel from "../models/postJobsModel.js";

const postJob = async (req, res) => {
	try {
		const addJobInfo = req.body;
		const company_id = req.company_id;

		const jobInfoData = { ...addJobInfo, company_id };

		const createdJob = await postJobsModel.create(jobInfoData);

		return res
			.status(201)
			.json({ message: "Job posted successfully!", createdJob });
	} catch (error) {
		console.log(error);
	}
};

export default postJob;
