import companyRegistration from "../models/companyRegistrationModel.js";

const editRegistrationInfo = async (req, res) => {
  try {
    const addRegistration = req.body;
    const company_certificate = req.file?.filename;
    const company_id = req.company_id;
    addRegistration["company_id"] = company_id;
    addRegistration["company_certificate"] = company_certificate;
    //create registeration
    const { registration_number, vat_number } = req.body;
    const registrationInfo = { registration_number, vat_number };
    const findRegistration = await companyRegistration.findOne({
      where: { registration_number: registrationInfo.registration_number },
    });
    if (findRegistration) {
      return res.status(403).json({ message: "Registration already added!" });
    }
    const registrationDetails = await companyRegistration.create(
      addRegistration
    );
    if (registrationDetails) {
      res
        .status(201)
        .json({ message: "Registration added!", registrationDetails });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default editRegistrationInfo;
