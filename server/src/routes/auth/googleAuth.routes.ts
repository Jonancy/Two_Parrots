import { Router } from "express";
import passport from "../../config/passport/passport";
import {
  jwtAccessCreation,
  jwtRefreshCreation,
} from "../../utils/token-manager";
import { Request, Response } from "express-serve-static-core";
import { Users } from "@prisma/client";
import { IUserDetails } from "../../interfaces/user.interfaces";
import {
  IGoogleUserDetails,
  IGoogleUserDetailsExtended,
} from "../../interfaces/oauth.interfaces";
export const googleAuthRoutes = Router();

//! Have to set session false cuz we using cookies
googleAuthRoutes.get(
  "/register",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account", // Add this line
  }),
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5000/login",
    session: false,
  }),
  async (req: Request, res: Response) => {
    //! Extending the request object/interface cuz the google sends id and other stuffs and user object ma id chaina userId cha
    const user = req.user as IGoogleUserDetailsExtended;
    const googleUserDetails: IGoogleUserDetails = {
      ...user._json,
    };

    console.log(user, "kalalalal");
    console.log(googleUserDetails, "asas");

    const refreshToken = jwtRefreshCreation({ userId: googleUserDetails.sub });
    const accessToken = jwtAccessCreation({
      userId: googleUserDetails.sub,
      role: "ADMIN",
    });

    const userDetails: IUserDetails & { token: string } = {
      userId: googleUserDetails.sub,
      name: googleUserDetails.name,
      email: googleUserDetails.email,
      picture: googleUserDetails.picture,
      phoneNumber: "",
      token: accessToken,
    };

    res.cookie("token", refreshToken, {
      httpOnly: true, // Must be false to access in JS
      secure: true, // For local development. Set to true in production with HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //For a day 24 hrs
    });
    res.status(201).json({ data: userDetails }); // Adjust this URL as needed
  }
);

//!Ani yo callback le afai authenticate gardincha like code phataucha and yele afai check gardincah by sending it to google
//! yedi thik cha vane proceed natra failure redirect
googleAuthRoutes.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5000/login",
    session: false,
  }),
  async (req: Request, res: Response) => {
    //! Extending the request object/interface cuz the google sends id and other stuffs and user object ma id chaina userId cha
    const user = req.user as IGoogleUserDetailsExtended;
    const googleUserDetails: IGoogleUserDetails = {
      ...user._json,
    };

    console.log(user, "kalalalal");
    console.log(googleUserDetails, "asas");

    const refreshToken = jwtRefreshCreation({ userId: googleUserDetails.sub });
    const accessToken = jwtAccessCreation({
      userId: googleUserDetails.sub,
      role: "ADMIN",
    });

    const userDetails: IUserDetails & { token: string } = {
      userId: googleUserDetails.sub,
      name: googleUserDetails.name,
      email: googleUserDetails.email,
      picture: googleUserDetails.picture,
      phoneNumber: "",
      token: accessToken,
    };

    res.cookie("token", refreshToken, {
      httpOnly: true, // Must be false to access in JS
      secure: true, // For local development. Set to true in production with HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //For a day 24 hrs
    });
    res.redirect(
      `http://localhost:5000/profile/${
        userDetails.userId
      }?user=${encodeURIComponent(JSON.stringify(userDetails))}`
    );
  }
);
