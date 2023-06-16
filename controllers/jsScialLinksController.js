import jsSocialLinksModel from "../models/jsSocialLinksModel.js";

const addLinksController = async (req, res) => {
  try {
    const addLink = req.body;
    const id = req.userId;
    addLink["js_id"] = id;
    // Check if the user already has a social link
    const existingLink = await jsSocialLinksModel.findOne({ where: { js_id: id } });
    if (existingLink) {
      return res.status(400).json({ message: "Social link already added!" });
    }

    const newLink = await jsSocialLinksModel.create(addLink);
    if (newLink) {
      return res.status(201).json({ message: "Link added successsfully", newLink });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to add link!" });
  }
};

const deleteSocialLink = async (req, res) => {
  try {
    const id = req.userId;
    const findLink = await jsSocialLinksModel.findOne({ where: { js_id: id } });
    const deleteLink = await jsSocialLinksModel.destroy(findLink)
    if (deleteLink) {
      return res.status(201).json({ message: "Link deleted succesfully!" })
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to delete link!" })
  }
}


export default addLinksController;
