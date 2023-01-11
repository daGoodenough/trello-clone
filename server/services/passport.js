require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: "40017934833-p5aksfstep103as7v79gmcdkqnmhji40.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: '/oauth2/redirect/google',
    },
    (issuer, profile, done) => {
      //here you will look up the user in the data base
      //if they exist then you will login them in
      //if they do not exist they should be registerd in the db
      return done(null, profile)
    }
  )
)
