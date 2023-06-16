import applications from "../models/applicationsModel.js";
import jobs from "../models/postJobsModel.js";
import jobSeeker from "../models/jobSeekersModel.js";

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
const applicantInfo = async (req, res) => {
  try {
    const { id } = req.company_id;

    const allInfo = await applications.findAll({
      where: { company_id: id },
      include: [
        {
          model: jobs,
          required: false
        },
        {
          model: jobSeeker,
          required: true
        }
      ]
    // attributes: {
    //     exclude: ["JobId"]
    // }
    });
    if (allInfo) {
      res.status(200).json(allInfo);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information" });
  }
};
export { jobApplication, applicantInfo };
