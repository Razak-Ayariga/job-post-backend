import jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";
import { v4 as uuidv4} from "uuid";



const uploadFilesController = async(destination)=>{
    try{
      const uuid = uuidv4;
      
      const newProfile = await jobSeekerProfileModel.create({ gitHubLink,  linkedInLink, photo:Path, cv:cvPath });
      
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

export default uploadFilesController;