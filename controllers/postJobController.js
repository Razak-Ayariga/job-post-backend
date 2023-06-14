import postJobsModel from "../models/postJobsModel.js";
import companies from "../models/companyModel.js";
// import postedJobs from "../models/postJobsModel.js";

//check job status
const updateJobStatus = async (jobId) => {
  try {
    const job = await postJobsModel.findByPk(jobId);
    const currentDate = new Date();
    const applicationDeadline = new Date(job.application_deadline);

    if (currentDate > applicationDeadline) {
      job.status = "inactive";
      await job.save();
    }
  } catch (error) {
    console.log(error);
  }
};

// create a job post
const postJob = async (req, res) => {
  const addJobInfo = req.body;
  const id = req.company_id;
  addJobInfo["company_id"] = id;
  try {
    const newJob = await postJobsModel.create(addJobInfo);
    const job = newJob.dataValues;
    if (newJob) {
      updateJobStatus(job.id);
      return res.status(201).json({ message: "Job posted successfully!", job });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: " Failed to post job!" });
  }
};

//update a posted job
const updateJob = async (req, res) => {
  const updateInfo = req.body;
  try {
    console.log(updateInfo);
    const { id } = req.params;
    const findJob = await postJobsModel.findByPk(id);
    if (!findJob) {
      return res.status(404).json({ message: "Job record not found!" });
    }
    const updateResult = await postJobsModel.update(updateInfo, {
      where: { id: id },
    });
    if (updateResult) {
      res.status(200).json({ message: "Job updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ messaage: "Error updating job" });
  }
};

// get one job
const getOneJob = async (req, res) => {
  try {
    const { id } = req.params;
    const getJob = await postJobsModel.findByPk(id);
    if (!getJob) {
      return res.status(404).json({ message: "No job record found!" });
    }
    res.status(200).json(getJob);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting job record" });
  }
};

//get all jobs posted by a company
const getAllJobs = async (req, res) => {
  try {
    const company_id = req.params.id;
    const findAllJobs = await postJobsModel.findAll({
      where: { company_id: company_id },
    });
    if (findAllJobs) {
      res.status(200).json(findAllJobs);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error geetting all jobs!" });
  }
};

// get all available jobs
const getAllAvailableJobs = async (req, res) => {
  try {
    const findAllJobs = await postJobsModel.findAll();
    if (findAllJobs) {
      res.status(200).json(findAllJobs);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error geetting all jobs!" });
  }
};
//get all company details of a job
// const companyDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const getDetails = await postJobsModel.findAll({
//       where: { id: id },
//       include: [{
//         model: companies,
//         required: false,
//         attributes: {
//           exclude: ["deletedAt", "createdAt", "updatedAt"]
//         }
//       }]
//     });
//     if (!getDetails) {
//       return res.status(400).json({ message: "No information found!" });
//     }
//     res.status(200).json(getDetails);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({message:"Failed to get information!"})
//   }
// }

//delete a posted job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const findJob = await postJobsModel.findByPk(id);
    if (!findJob) {
      return res.status(404).json({ message: "No jobs found!" });
    }
    const deleteResults = await postJobsModel.destroy({ where: { id: id } });
    if (deleteResults) {
      res.status(200).json({ message: "Job deleted successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting jobs!" });
  }
};

export {
  postJob,
  getOneJob,
  getAllJobs,
  deleteJob,
  getAllAvailableJobs,
  updateJob,
}; //companyDetails };
