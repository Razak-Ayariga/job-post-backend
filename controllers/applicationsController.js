import applications from "../models/applicationsModel.js";
// import jobs from "../models/postJobsModel.js";
// import education from "../models/educationModel.js";
// import experience from "../models/experienceModel.js";
// import skills from "../models/skillsModel.js";
// import languages from "../models/languageModel.js";
// import jsSocialLinks from "../models/jsSocialLinksModel.js";
import jobSeeker from "../models/jobSeekerModel.js";
// import jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";

const jobApplication = async (req, res) => {
  try {
    const addApplication = req.body;
    const cv = req.file?.filename;
    const id = req.userId;
    addApplication["js_id"] = id;
    addApplication["cv"] = cv;
    const newApplication = await applications.create(addApplication);
    if (newApplication) {
      return res.status(201).json({ message: "Application created sucessfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating application!" });
  }
};

// Get all job applications
const allApplications = async (req, res) => {
  try {
    const userId  = req.userId;
    if (!userId) {
      return res.status(404).json({ message: "No user found!" });
    }
    const jobApplications = await applications.findAll({
      where: {id:userId},
      include: [
        {
          model: jobSeeker,
          required: false
        }
      ]
    });
    if (jobApplications) {
      res.status(200).json(jobApplications);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information!" });
  }
};

// delete and application record
const deleteAppliocation = async (req, res) => {
  try {
    const {id} = req.params;
    const findApplication  = await applications.findByPk(id);
    if(!findApplication){
      return res.status(404).json({messgae:"Record not found!"});
    }
    const deleteResults = await applications.destroy({where:{id}});
    if(deleteResults){
      res.status(200).json({message:"Recorded deleted successfully!"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error!"});
  }
};
export {
  jobApplication,
  // applicantInfo,
  allApplications,
  deleteAppliocation
};
