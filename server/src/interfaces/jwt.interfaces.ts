import { JwtPayload } from "jsonwebtoken";

export interface JwtRefreshPayloadExtended extends JwtPayload {
  userId: string;
}

export interface JwtAccessPayloadExtended extends JwtPayload {
  userId: string;
  role: string; //Number format ma aye pani string ma huncha enum
}
