import companyRegistration from "../models/companyRegistrationModel.js";

const newRegistration = async (req, res) => {
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
      where: { registration_number: registrationInfo.registration_number }
    });
    if (findRegistration) {
      console.log(findRegistration);
      return res.status(403).json({ message: "Registration already added!" });
    }
    const registrationDetails = await companyRegistration.create(
      addRegistration
    );
    if (registrationDetails) {
      return res.status(201).json({ message: "Registration added!", registrationDetails });
    }
  } catch (error) {
    console.error(error);
    // sres.status(500).json({ message: "Server Error" });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const newRegistration = req.body;
    const { id } = req.params;
    const findRegistration = await companyRegistration.findByPk(id);
    if (!findRegistration) {
      return res.status(404).json({ message: "No record found!" });
    }
    const updateResult = await companyRegistration.update(newRegistration, {
      where: { id: id },
    });
    if (updateResult) {
      res.status(200).json({ message: "Registration updated successfully!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { newRegistration, updateRegistration };
