const crypto = require('crypto');

exports.setPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  // set this info onto the user
  return {
    salt,
    hash
  }
}

exports.validPassword = (password) => {
  // psswd = 'bitcoin'
  const bitcoin = {
    salt: '328f87109ba43be16692547abece218f',
    hash: 'cf1479998b6fbb063abc443d297bb5f35e85880c4feb88d3430a915abaf810145500ef433da9e956457c97df9c26b534216f5284f425b005c8c604cbc017cb08'
  }
  // const salt = get user salt
  var hash = crypto.pbkdf2Sync(password, bitcoin.salt, 1000, 64, 'sha512').toString('hex');

  // get user hash
  return bitcoin.hash === hash;
}