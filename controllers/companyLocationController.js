import locations from "../models/locationModel.js";

//add location
const addLocation = async (req, res) => {
  try {
    const locationInfo = req.body;
    const id = req.company_id;
    locationInfo["company_id"] = id;
    const newLocation = await locations.create(locationInfo);
    const location = newLocation.dataValues;
    const locationId = newLocation.dataValues.id;
    console.log(locationId);
    if (newLocation) {
      return res
        .status(201)
        .json({ message: "location posted successfully!", location });
    }
  } catch (error) {
    return res.status(400).json({ message: " Failed to post location!" });
  }
};

export default addLocation;
