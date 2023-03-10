const jwt = require('jwt-simple')
const { setPassword } = require('../services/passwords')


function tokenForUser(user) {
  return jwt.encode({
    sub: user.id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)
  }, 'helloworld')
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const token = tokenForUser(req.user)
  res.send({
    token,
  })
  next();
}

exports.signup = function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  // See if a user with the given email exists
  // User.findOne({ email: email }, function(err, existingUser) {
  // if (err) { return next(err) }

  // If a user with email does exist, return an error
  // if (existingUser) {
  //   return res.status(422).send({ error: 'Email is in use' })
  // }

  // If a user with email does NOT exist, create and save user record
  // const user = new User()

  // user.email = email

  // user.setPassword(password)
  const cryptoSecrets = setPassword(password)
  console.log(cryptoSecrets);

  // user.save(function(err, user) {
  //   if (err) { return next(err) }

  //   // Repond to request indicating the user was created
  //   res.json({ token: tokenForUser(user) })
  // });
  // });
}