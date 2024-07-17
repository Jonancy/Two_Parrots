import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  IGoogleUserDetails,
  IGoogleUserDetailsExtended,
} from "../interfaces/oauth.interfaces";
import { IUserDetails } from "../interfaces/user.interfaces";
import { jwtAccessCreation, jwtRefreshCreation } from "../utils/token-manager";

class OauthController {
  googleOauth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //! Extending the request object/interface cuz the google sends id and other stuffs and user object ma id chaina userId cha
      const user = req.user as IGoogleUserDetailsExtended;
      const googleUserDetails: IGoogleUserDetails = {
        ...user._json,
      };

      console.log(user, "kalalalal");
      console.log(googleUserDetails, "asas");

      const refreshToken = jwtRefreshCreation({
        userId: googleUserDetails.sub,
      });
      const accessToken = jwtAccessCreation({
        userId: googleUserDetails.sub,
        role: "ADMIN",
      });

      const userDetails: IUserDetails & { token: string } = {
        userId: googleUserDetails.sub,
        name: googleUserDetails.name,
        email: googleUserDetails.email,
        picture: googleUserDetails.picture,
        token: accessToken,
      };

      res.cookie("token", refreshToken, {
        httpOnly: true, // Must be false to access in JS
        secure: false, // For local development. Set to true in production with HTTPS
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //For a day 24 hrs
      });
      res.redirect(
        `http://localhost:5000/login?googleOauth=true&user=${JSON.stringify(
          userDetails
        )}`
      );
    } catch (e) {
      next(e);
    }
  };
}

export const oauthController = new OauthController();
