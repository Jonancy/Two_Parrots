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
import { oauthController } from "../../controllers/oauth.controller";
export const googleAuthRoutes = Router();

//! Have to set session false cuz we using cookies
googleAuthRoutes.get(
  "/register",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false, //! Passport is basically used for MVC patterns so it uses the session for the login record but for REST i wont be using it
    prompt: "select_account", // For selcting account
  }),
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5000/login",
    session: false,
  })
);

//!Ani yo callback le afai authenticate gardincha like code phataucha and yele afai check gardincah by sending it to google
//! yedi thik cha vane proceed natra failure redirect
googleAuthRoutes.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5000/login",
    session: false,
  }),
  oauthController.googleOauth
);
