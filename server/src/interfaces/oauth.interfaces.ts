import { Users } from "@prisma/client";

export interface IGoogleUserDetails {
  sub: string;
  name: string;
  picture: string;
  email: string;
}

export interface IGoogleUserDetailsExtended extends Users {
  _json: IGoogleUserDetails;
}
