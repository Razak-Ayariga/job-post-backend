import companyProfileModel from "../models/companyInfoModel.js";

const companyProfileController = async (req, res) => {
    const newProfile = req.body;
    const company_id = req.company_id;
    newProfile["company_id"] = company_id;

    try {
        const addCompanyProfile = await companyProfileModel.create(newProfile);
        if (addCompanyProfile) {
            res.status(201).json({ message: "Profile created successfully!" });
        }
    } catch (error) {
        res.status(400).json({ message: "failed to add profile!" });
    }
};

export default companyProfileController;