import multer, { FileFilterCallback, Multer } from "multer";
import CustomError from "../handlers/errors/customError";

export const createMulterUpload = (uploadPath: string): Multer => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  return multer({
    storage: storage,
    limits: { fileSize: 100000000 }, //10MB size limit
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });
};

function checkFileType(
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  // Define allowed MIME types
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "audio/mpeg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        "Only images (jpeg, jpg, png, gif) and music files (mp3) are allowed!",
        400
      )
    );
  }
}
