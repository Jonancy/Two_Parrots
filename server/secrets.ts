import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

//!URL's
export const PORT = process.env.PORT;
export const BASE_URL = process.env.BASE_URL;
export const DATABASE_URL = process.env.DATABASE_URL;
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

//!JWT
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
export const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;

//!CLOUDINARY
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET_KEY = process.env.CLOUDINARY_API_SECRET_KEY;

//!KHALTI ESEWA
export const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;

//!OAUTH GOOGLE
export const OAUTH_GOOGLE_CLIENT_ID = process.env.OAUTH_GOOGLE_CLIENT_ID;
export const OAUTH_GOOGLE_CLIENT_SECRET =
  process.env.OAUTH_GOOGLE_CLIENT_SECRET;
