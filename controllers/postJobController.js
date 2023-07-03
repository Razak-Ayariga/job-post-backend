import applicationsModel from "../models/applicationsModel.js";
import postJobsModel from "../models/postJobsModel.js";
import jobSeekerRigistration from "../models/jobSeekerModel.js";
import jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";
import education from "../models/educationModel.js";
import skills from "../models/skillsModel.js";
import experience from "../models/experienceModel.js";
import languages from "../models/languageModel.js";
import jsSocialLinks from "../models/jsSocialLinksModel.js";


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


//check job status
const updateJobStatus = async (jobId) => {
  try {
    const job = await postJobsModel.findByPk(jobId);
    const currentDate = new Date();
    const applicationDeadline = job.application_deadline;

    if (currentDate > applicationDeadline) {
      job.status = "inactive";
      await job.save();
    }
  } catch (error) {
    console.log(error);
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
      where: { id: id }
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
const getCompanyAllJobs = async (req, res) => {
  try {
    const company_id = req.params.id;
    const findAllJobs = await postJobsModel.findAll({
      where: { company_id: company_id }
    });
    if (findAllJobs) {
      res.status(200).json(findAllJobs);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error geetting all jobs!" });
  }
};
//available jobs
const getAllJobs = async (req, res) => {
  try {
    const findAllJobs = await postJobsModel.findAll();
    if (!findAllJobs) {
      return res.status(404).json({message:"No jobs found!"});
    }
    res.status(200).json(findAllJobs);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error geetting all jobs!" });
  }
};

// get all applicants of a job
const allJobApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const findAllApplicants = await postJobsModel.findAll({
      where: { id: id },
      include: [
        {
          model: applicationsModel,
          include: [
            {
              model: jobSeekerRigistration,
              include: [
                jobSeekerProfileModel,
                education,
                skills,
                experience,
                languages,
                jsSocialLinks
              ]
            }
          ]
        }
      ]
    });
    if (!findAllApplicants) {
      return res.status(404).json({ message: "No information found!" });
    }
    res.status(200).json({ message: "Success", findAllApplicants });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information!" });
  }
};

// update applicant's status
const updateApplicantStatus = async(req, res)=>{
  const {app_id, job_id, status} = req.body;
  try{
    const applicationExist = await applicationsModel.findByPk(app_id);
    if(!applicationExist){
      return res.status(400).json({message:"application not found"});
    }
    const updateStatus = await applicationsModel.update({status:status}, {where:{id:app_id}});
    if(updateStatus){
      const updateInfo = await applicationsModel.findByPk(app_id);
      if(updateInfo){
        req.jobId = job_id;
        await allJobApplicants(req, res);
      }
    }

  }catch(error){
    console.log(error);
    res.status(500).json({message:"Error updating status"});
  }
};

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
  updateJob,
  getOneJob,
  getAllJobs,
  getCompanyAllJobs,
  allJobApplicants,
  updateApplicantStatus,
  deleteJob
};
