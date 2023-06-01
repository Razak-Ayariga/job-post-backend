// import jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";

// const uploadPhotoController = async (req, res) => {
//   const photo = req.file?.filename
//   const js_id = req.userId
//   try {
//     const newProfile = await jobSeekerProfileModel.create({
//       js_id,
//       photo
//     });
//     if (newProfile) {
//       res.status(202).json({ message: "Profile created successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "failed to create profile" })
//   }
// };

// // update photo
// // const updatePhoto = async (req, res) => {
// //   try {
// //     // const photo = req.file;
// //     const photo = req.file;
// //     const profileId  = req.params.profileId;
// //     if (!profileId) {
// //       res.status(404).json({ message: "Photo not found!" });
// //       return;
// //     }
// //     const result = await jobSeekerProfileModel.update({ photo: photo }, { where: { profileId: profileId }});
// //     if (result) {
// //       res.status(200).json({message:"photo updated successfully!"})
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.status(400).json({message: "Unable to update photo"})
// //   }
// // }
// export default uploadPhotoController;