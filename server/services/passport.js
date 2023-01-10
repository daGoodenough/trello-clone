const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
