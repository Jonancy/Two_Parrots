import { Request, Response, NextFunction } from "express";
import streamifier from "streamifier";
import CustomError from "../../handlers/errors/customError";
import cloudinary from "../../config/cloud/cloudinary.config";

// Function to handle file upload to Cloudinary
const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

// Middleware to handle single file upload
export const handleSingleFileUpload = (fieldName: string, folder: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return next(new CustomError("No file uploaded.", 400));
      }

      const fileBuffer = req.file.buffer;
      const imageUrl = await uploadToCloudinary(fileBuffer, folder);
      req[fieldName] = imageUrl; // Store image URL in request object under field name

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const handleMultipleFileUpload = (
  fieldNames: string[],
  folder: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let uploadedFiles: string[] = [];
      console.log(req.body, "asas");
      console.log(req.files);

      // Check if any files were uploaded
      if (req.files) {
        // Iterate over the field names and upload each file
        for (const fieldName of fieldNames) {
          const files = req.files[fieldName];

          if (files) {
            // return next(
            //   new CustomError(`No file uploaded for ${fieldName}`, 400)
            // );
            if (Array.isArray(files)) {
              const uploadedFileUrls = await Promise.all(
                files.map(async (file) => {
                  const fileBuffer = file.buffer;
                  return await uploadToCloudinary(fileBuffer, folder);
                })
              );
              uploadedFiles = uploadedFileUrls;
            }
          }
          console.log("pass", uploadedFiles);
          req.images = uploadedFiles;
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
