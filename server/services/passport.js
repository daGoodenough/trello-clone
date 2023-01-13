require('dotenv').config();
const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { validPassword } = require('./passwords')

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async function (email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  const user = await prisma.user.findFirst({ where: { email: email } })
  if (!user) {
    return done(null, false)
  }
  console.log("User", user)
  if (!validPassword(password)) {
    return done(null, false, { message: 'Incorrect password.' })
  }
  return done(null, user);
});

passport.use(localLogin)

