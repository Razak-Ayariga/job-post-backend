import multer from "multer";
import path from "path";


const photoFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("photo")){
        cb(null, true);
    } else {
        cb("Please upload only images!", false);
    }
};

const storage = multer.diskStorage({
    destination:(req, res, cb) => {
     cb(null, "./Public")
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        cb(null, Date.now() + extension);
    }
});

const uploadMiddleware = multer({ storage, photoFilter})

export default uploadMiddleware;