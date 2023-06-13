import multer from "multer";
import path from "path";
const absolutePath = path.resolve("./");

const uploadCvMiddleware = (destination) => {
    const directory = path.join(absolutePath, destination);
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directory)
        },
        filename: function (req, file, cb) {
            const filename = file.fieldname + '_' + Date.now() + path.extname(file.originalname)
            cb(null, filename)
        }
    });

 
    const fileFilter = (req, res, cb) => {
         const extension = path.extname(file.originalname).toLowerCase();
    if (extension === ".pdf" && file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF files are allowed."));
    }
    };

    const upload = multer({ storage })
    return upload
};

export default uploadCvMiddleware;