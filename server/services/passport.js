require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const {validPassword} = require('./passwords')

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  console.log(email, password);
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  console.log("Valid?: ", validPassword(password))
  // FIND USER BY EMAIL IN DB
    //if not found return done(null, false)
    //if found check password
      if(!validPassword(password)){
        return done(null, false, { message: 'Incorrect password.' })
      }
    //return done(null, user);
    return done(null, email);
});

passport.use(localLogin)

