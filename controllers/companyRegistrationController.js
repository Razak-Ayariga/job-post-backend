import companyRegistration from "../models/companyRegistrationModel.js";

const editRegistrationInfo = async (req, res) => {
  try {
    const addRegistration = req.body;
    const company_certificate = req.file?.filename;
    const company_id = req.company_id;
    addRegistration["company_id"] = company_id;
      addRegistration["company_certificate"] = company_certificate;
//create registeration
    const registrationDetails = await companyRegistration.create( addRegistration);
    if (registrationDetails) {
      res.status(201).json({ message: "Registration added!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export default editRegistrationInfo;
