import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import jwt from "jsonwebtoken";
import { JwtAccessPayloadExtended, JwtRefreshPayloadExtended } from "../interfaces/jwt.interfaces";

const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;


//!For Refresh token
// Function to create a JWT
export const jwtRefreshCreation = ({
  name,
  id,
  email,
  picture,
}: JwtRefreshPayloadExtended): string => {
  const token = jwt.sign({ name, id, email, picture }, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "10d",
    algorithm: "HS256", // Algorithm used to sign the token
  });
  return token;
};

// Function to verify a JWT access token
export const jwtRefreshVerification = (token: string): JwtRefreshPayloadExtended => {
  return jwt.verify(token, JWT_REFRESH_SECRET_KEY) as JwtRefreshPayloadExtended;
};


//!For Access token
export const jwtAccessCreation = ({ id, email }:JwtAccessPayloadExtended ): string => {
  const token = jwt.sign({ id, email }, JWT_ACCESS_SECRET_KEY, {
    expiresIn: "10m",
    algorithm: "HS256", // Algorithm used to sign the token
  });
  return token;
};

export const jwtAccessVerification = (token: string): JwtAccessPayloadExtended => {
  return jwt.verify(token, JWT_ACCESS_SECRET_KEY) as JwtAccessPayloadExtended;
};
