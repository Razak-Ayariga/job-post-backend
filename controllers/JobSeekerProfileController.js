import jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";
import { v4 as uuidv4} from "uuid";
import multer from "multer";

const uploadFiles = async(req, res)=>{
    try{
      const uuid = uuidv4;
      const { gitHubLink, linkedInLink } = req.body;
      const newProfile = await jobSeekerProfileModel.create({ gitHubLink,  linkedInLink });
      
      newProfile["uuid"] = uuid;
      jobSeekerProfileModel.create(newProfile)
      .then(() => {
        res.status(202).json({message: "Profile created successfully"});
      })


    }catch(error){
        console.log(error);
        res.status(402).json({message: "failed to create profile"})
    }
}

export default uploadFiles;