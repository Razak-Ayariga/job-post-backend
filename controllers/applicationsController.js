
// Get all job applications
const allJobApplications = async (req, res) => {
  try {
      const userId  = req.userId;
      console.log(userId);
      if (!userId) {
          return res.status(404).json({ message: "No user found!" });
      }
    const jobApplications = await applications.findAll({
      where: {id:userId},
      include: [
        {
          model: jobSeeker,
          required: false
        }
      ]
    });
    if (jobApplications) {
      res.status(200).json(jobApplications);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error getting information!" })
  }
};
export { jobApplication, applicantInfo, allJobApplications };