import jwt from "jsonwebtoken";
import {
  JwtAccessPayloadExtended,
  JwtRefreshPayloadExtended,
} from "../interfaces/jwt.interfaces";
import { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from "../../secrets";

//!For Refresh token
// Function to create a JWT
export const jwtRefreshCreation = ({
  id,
}: JwtRefreshPayloadExtended): string => {
  const token = jwt.sign({ id }, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "10d",
    algorithm: "HS256", // Algorithm used to sign the token
  });
  return token;
};

// Function to verify a JWT access token
export const jwtRefreshVerification = (
  token: string
): JwtRefreshPayloadExtended => {
  return jwt.verify(token, JWT_REFRESH_SECRET_KEY) as JwtRefreshPayloadExtended;
};

//!For Access token
export const jwtAccessCreation = ({
  id,
  email,
}: JwtAccessPayloadExtended): string => {
  const token = jwt.sign({ id, email }, JWT_ACCESS_SECRET_KEY, {
    expiresIn: "10m",
    algorithm: "HS256", // Algorithm used to sign the token
  });
  return token;
};

export const jwtAccessVerification = (
  token: string
): JwtAccessPayloadExtended => {
  return jwt.verify(token, JWT_ACCESS_SECRET_KEY) as JwtAccessPayloadExtended;
};
