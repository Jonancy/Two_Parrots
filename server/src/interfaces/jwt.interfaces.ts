import { JwtPayload } from "jsonwebtoken";


export interface JwtRefreshPayloadExtended extends JwtPayload {
  name: string;
  id: string;
  email: string;
  picture: string;
}

export interface JwtAccessPayloadExtended extends JwtPayload {
  id: string;
  email: string;
}