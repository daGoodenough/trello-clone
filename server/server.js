const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

passport.serializeUser((user, done) => {
  console.log("User before serializing: ", user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // this is where you could find the user in the database from the id
  // done(null, user);
})

const routes = require('./routes/main');
app.use(routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})