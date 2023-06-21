import applications from "../models/applicationsModel.js";
import jobs from "../models/postJobsModel.js";
import jobSeeker from "../models/JobSeekerModel.js";
import education from "../models/educationModel.js";
import experience from "../models/experienceModel.js";;
import skills from "../models/skillsModel.js";
import languages from "../models/languageModel.js";
import jsSocialLinks from "../models/jsSocialLinksModel.js";

const jobApplication = async (req, res) => {
    try {
        const addApplication = req.body;
        const cv = req.file?.filename;
        const js_id = req.userId;
        addApplication["js_id"] = js_id;
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

// get applicant info
// const applicantInfo = async (req, res) => {
//     try {
//         const job_id = req.params.job_id;
//         const allInfo = await applications.findAll({
//             where: { job_id },
//             include: [
//                 {
//                     model: jobs,
//                     required: false,
//               },
//                 {
//                     model: jobSeeker,
//                     required: false,
//                     include: [education, experience, skills, languages, jsSocialLinks]
//                 }
//             ],
//             // group: ["jobs.id"]
//         });
//         if (allInfo) {
//             res.status(200).json(allInfo);
//         }
//     } catch (error) {

//         console.log(error);
//         res.status(400).json({ message: "Error getting information" })
//     }
// };
const applicantInfo = async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const allInfo = await applications.findAll({
      where: { job_id: job_id },
      include: [
        {
          model: jobs,
          required: true
        },
        {
          model: jobSeeker,
          required: true,
          include: [education, experience, skills, languages, jsSocialLinks]
        }
      ], group:["job_id"]
    }); 
    if (allInfo) {
      res.status(200).json(allInfo);
    }
  } catch (error) {
    console.log(error);
    res.status.json({message:"Error getting information!"})
  }
}

// Get all job applications
const allJobApplications = async (req, res) => {
  try {
      const userId  = req.userId;
      console.log(userId);
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
    res.status(400).json({ message: "Error getting information!" })
  }
};
export { jobApplication, applicantInfo, allJobApplications };