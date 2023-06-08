import postJobsModel from "../models/postJobsModel.js";
import applicationsModel from "../models/applicationsPostModel.js";


//applying for a 
const applyForJob = async (req, res) => {
  try {
    const { js_id, jobs_id, application } = req.body;

    // Check if the job and job seeker exist
    const job = await postJobsModel.findByPk(jobs_id);
    const jobSeeker = await jobSeekers.findByPk(js_id);
    if (!job || !jobSeeker) {
      return res.status(404).json({ message: "Job or Job Seeker not found!" });
    }

    // Create a new application
    const newApplication = await applicationsModel.create({
      js_id: js_id,
      jobs_id: jobs_id,
      application: application,
    });

    if (newApplication) {
      return res
        .status(201)
        .json({ message: "Application submitted successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to submit application!" });
  }
};


// Job poster - Get all applicants by their ID
const getAllApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await postJobsModel.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }
    const applicants = await applicationsModel.findAll({
      where: { jobs_id: id },
      include: [{ model: jobSeekers, as: "jobSeeker" }],
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

export { getAllApplicants, getAppliedJobs, applyForJob };
