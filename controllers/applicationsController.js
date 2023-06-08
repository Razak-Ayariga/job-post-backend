import postJobsModel from "../models/postJobsModel.js";
import applicationsModel from "../models/applicationsModel.js";

// Job poster - Get all applicants by their ID
const getAllApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await postJobsModel.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }
    const applicants = await applicationsModel.findAll({
      where: { postedjob_id: postedjob_id },
    });
    res.status(200).json(applicants);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting applicants!" });
  }
};

// Job seeker - View all jobs applied to
const getAppliedJobs = async (req, res) => {
  try {
    const { js_id } = req.params;
    const appliedJobs = await applicationsModel.findAll({
      where: { js_id: js_id },
      include: [{ model: postJobsModel, as: "job" }],
    });
    res.status(200).json(appliedJobs);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting applied jobs!" });
  }
};

export {
  getAllApplicants,
  getAppliedJobs,
};
