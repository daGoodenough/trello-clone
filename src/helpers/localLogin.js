import axios from 'axios';

const localLogin = (event) => {
  const email = event.currentTarget[0].value
  const password = event.currentTarget[1].value

  axios.post('http://localhost:5000/auth/login', {
    email,
    password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default localLogin;