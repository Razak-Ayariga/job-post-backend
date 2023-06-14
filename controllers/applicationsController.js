import applications from "../models/applicationsModel.js";

const jobApplication = async (req, res) => {
  try {
    const addApplication = req.body;
    const cv = req.file?.filename;
    const cover_letter = req.file?.filename;
    const {id} = jobId.id;
    console.log(jobId);
    const js_id = req.userId;
    addApplication["job_id"] = id;
    addApplication["js_id"] = js_id;
    addApplication["cv"] = cv;
    addApplication["cover_letter"] = cover_letter;
    const newApplication = await applications.create(addApplication);
    if (newApplication) { return res.status(201).json({ message: "Application created sucessfully!" });
    }} catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating application!" });}
};
export default jobApplication;
