import locations from "../models/locationModel.js";

// add location
const addLocation = async (req, res) => {
  try {
    const locationInfo = req.body;
    const id = req.company_id;
    locationInfo["company_id"] = id;

    // Check if there is existing information in the location table
    const existingLocation = await locations.findOne({ where: { company_id: id } });

    let newLocation;
    if (existingLocation) {
      newLocation = await locations.update(locationInfo, { where: { company_id: id } });
    } else {
      newLocation = await locations.create(locationInfo);
    }

    if (newLocation) {
      return res
        .status(201)
        .json({ message: "Location posted successfully!", locationInfo });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to post location!" });
  }
};

//Update location
const updateLocation = async (req, res) => {
  try {
    const newLocationInfo = req.body;
    const { id } = req.params;
    const findLocation = await locations.findByPk(id);
    if (!findLocation) {
      return res.status(404).json({ message: "No location found" });
    }
    const updateResults = await locations.update(newLocationInfo, { where: { id: id } });
    if (updateResults) {
      res.status(200).json({ message: "Location updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error updating location" });
  }
}

export { addLocation, updateLocation};
