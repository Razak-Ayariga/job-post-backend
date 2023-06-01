// import { allow } from "joi";
// import multer from "multer";
// import path from "path";
// const absolutePath = path.resolve('./')

// const uploadMiddleware = (destination) => { 
//     const directory = path.join(absolutePath, destination)
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, directory)
//         },
//         filename: function (req, file, cb) {
//             const filename = file.fieldname + '_' + Date.now() + path.extname(file.originalname)
//             cb(null, filename)
//         }
//     });
    
//     const upload = multer({ storage });
//     return upload;
// }
// export default uploadMiddleware;























