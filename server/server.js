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
  saveUninitialized: false,
  cookie: {}
}));

app.use(passport.authenticate('session'));

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    done(null, user.id);
  });
});

passport.deserializeUser(function(id, done) {
  process.nextTick(function() {
    return done(null, id);
  });
});

const routes = require('./routes/main');
app.use(routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})