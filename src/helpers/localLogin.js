
const localLogin = (event) => {
  event.preventDefault();
  const email = event.currentTarget[0].value
  const password = event.currentTarget[1].value

  const data = {email, password}

  fetch('http://localhost:5000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => {
  if(response.status === 401){
    throw new Error("Incorrect username or password")
  }
  return response.json()})
.then(data => {
    localStorage.setItem("token", data.token);
    return 200;
  })
  .catch(error => {
    return 401;
  });
}

export default localLogin;