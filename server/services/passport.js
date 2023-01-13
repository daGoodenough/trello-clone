require('dotenv').config();
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const passport = require('passport');
const { validPassword } = require('./passwords')
const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  const user = await prisma.user.findFirst({ where: { email: email } })
  if (!user) {
    return done(null, false)
  }
  if (!validPassword(password)) {
    return done(null, false, { message: 'Incorrect password.' })
  }
  return done(null, user);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'helloworld'
};

const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  const user = await prisma.user.findFirst({ where: { id: payload.sub } })  
  // User.findById(payload.sub, function(err, user) {
  //   if (err) { return done(err, false) }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  // });
});

passport.use(localLogin)
passport.use(jwtLogin)

