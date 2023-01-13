
const localLogin = (event) => {
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
.then(response => response.json())
.then(data => {
    localStorage.setItem("token", data.token)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

export default localLogin;