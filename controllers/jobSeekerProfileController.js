// import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import jobSeekerProfile from "../models/jobSeekerProfileModel.js";

//Job seeker registration
const createProfile = async (req, res) => {
  try {
    const newProfile = req.body;
    const uuid = uuidv4();
      const photo = req.file?.filename;
      const id = req.userId
      newProfile["js_id"] = id;
    newProfile["uuid"] = uuid;
    newProfile["photo"] = photo;
      const addProfile = await jobSeekerProfile.create(newProfile);
      if(addProfile)
        res.status(201).json({ message: "Profile created successfully", newProfile});
        return;
      
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to create profile!" });
  }
};

//get a job seeker
const getJobSeeker = async (req, res) => {
  const id = req.userId;
  const findUser = await jobSeeker.findOne({
    id,
    attributes: { exclude: ["password"] },
  });
  if (findUser) {
    return res.status(200).json({ jobseeker: findUser.dataValues });
  } else {
    return res.status(400).json({ message: "User not found..." });
  }
};
// update job seeker info
const updateProfile = async (req, res) => {
  try {
    const userInfo = req.body;
    const { id } = req.params;
    const photo = req.file?.filename;
    userInfo["photo"] = photo;
    const findProfile = await jobSeekerProfile.findByPk(id);
    if (!findProfile) {
      return res.status(404).json({message: "No profile found!"})
    } else {
      const updateResult = await jobSeekerProfile.update(userInfo, {
        where: { id: id },
      });
      if (updateResult) {
        res.status(201).json({ message: "Updated successfully!", userInfo });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "failed to update!" });
  }
};

// //delete a job seeker's record
// const deleteJobSeeker = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const findJobSeeker = await jobSeeker.findByPk(userId);
//     if (!findJobSeeker) {
//       return res.status(404).json({ message: "Record not found" });
//     }
//     await Education.destroy({ where: { js_id: userId } });
//     await Experience.destroy({ where: { js_id: userId } });
//     await Languages.destroy({ where: { js_id: userId } });
//     await Skills.destroy({ where: { js_id: userId } });
//     await jsSocialLinks.destroy({ where: { js_id: userId } });
//     await cv.destroy({ where: { js_id: userId } });
//     await applications.destroy({ where: { js_id: userId } });
//     await findJobSeeker.destroy();
//     res.status(200).json({ message: "Record deleted successfully!" });

//     setTimeout(async () => {
//       const permanentDelete = await jobSeeker.destroy({
//         where: { id: userId, deletedAt: { [Op.not]: null } },
//         force: true, // Permanently delete the record
//         include: [Education, Experience, Skills, Languages, jsSocialLinks, cv],
//       });
//       if (permanentDelete) {
//         console.log(`Record permanently deleted for ID: ${userId}`);
//       }
//     }, 30 * 24 * 60 * 60 * 1000);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Could not delete record!" });
//   }
// };

// //Verify Email
// const verifyEmail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const findUser = await jobSeeker.findOne({ where: { email: email } });
//     if (!findUser) {
//       return res.status(400).json({ message: "User does not exist" });
//     }
//     const user = {
//       id: findUser.dataValues.id,
//       email: findUser.dataValues.email,
//       password: findUser.dataValues.password,
//     };
//     res.status(200).json({ message: "User found!", user });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Failed verify email!" });
//   }
// };

// //Reset password
// const resetPassword = async (req, res) => {
//   try {
//     const user = req.body;
//     if (!user.id || !user.newPassword) {
//       return res.status(404).json({ message: "Enter new password" });
//     }
//     const samePassword = bcrypt.compareSync(user.newPassword, user.password)
//     if (samePassword) {
//       return res.status(404).json({ message: "Password can not be the same" })
//     }
//     const password = await bcrypt.hash(user.newPassword, 10);
//     const updatePassword = await jobSeeker.update(
//       { password: password },
//       { where: { id: user.id } }
//     );
//     if (updatePassword) {
//       res.status(200).json({ message: "Password updated successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Failed to reset password" })
//   }
// };

export { createProfile, updateProfile };
