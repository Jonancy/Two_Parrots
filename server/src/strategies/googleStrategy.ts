import GoogleStrategy from "passport-google-oauth20";
import {
  OAUTH_GOOGLE_CLIENT_ID,
  OAUTH_GOOGLE_CLIENT_SECRET,
} from "../../secrets";
import { userService } from "../services/user.service";
import { UserRegisterDTO } from "../dtos/user.dto";

const googleStrategy = new GoogleStrategy.Strategy(
  {
    clientID: OAUTH_GOOGLE_CLIENT_ID,
    clientSecret: OAUTH_GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    //! On here user already registered cha ki nai check matra garni ho teti

    try {
      const user = await userService.getUserById(profile.id);
      if (!user) {
        const userDTO: UserRegisterDTO = {
          userId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "",
          phoneNumber: "",
        };
        await userService.registerUser(userDTO);
      } else {
        console.log("user already ");
      }

      done(null, profile);
    } catch (e) {
      done(e);
    }
  }
);

export default googleStrategy;
