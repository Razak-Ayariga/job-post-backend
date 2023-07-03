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

//update links
const updateLinks = async (req, res) => {
  const updateInfo = req.body;
  try {
    const { id } = req.params;
    const findLink = await jsSocialLinksModel.findByPk(id);
    if (!findLink) {
      return res.status(404).json({ message: "language recored not found!" });
    }
    const updateRecord = await jsSocialLinksModel.update(updateInfo, {
      where: { id: id }
    });
    if (updateRecord) {
      res.status(200).json({ message: "link updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ messaage: "Error updating link" });
  }
};

const deleteLink = async (req, res) => {
  try {
    const id = req.userId;
    const findLink = await jsSocialLinksModel.findOne({ where: { js_id: id } });
    const deleteLink = await jsSocialLinksModel.destroy(findLink);
    if (deleteLink) {
      return res.status(201).json({ message: "Link deleted succesfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to delete link!" });
  }
};


export { addLinksController, updateLinks, deleteLink };
