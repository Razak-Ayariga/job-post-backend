import jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";

const uploadPhotoController = async(req, res)=>{
    const { gitHubLink,  linkedInLink } = req.body
    const photo = req.file?.filename
    const jobSeekerId = req.userId

    try{
      const newProfile = await jobSeekerProfileModel.create({ 
        jobSeekerId,
        gitHubLink, 
        linkedInLink, 
        photo 
      });
      if(newProfile){
        res.status(202).json({message: "Profile created successfully"});
      }
      }catch(error){
        console.log(error);
        res.status(400).json({message: "failed to create profile"})
    }
  }

export default uploadPhotoController;