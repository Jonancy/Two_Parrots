import passport from "passport";
import googleStrategy from "../../strategies/googleStrategy";

passport.use(googleStrategy);

export default passport;
