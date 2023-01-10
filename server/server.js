const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const routes = require('./routes/main');
app.use(routes);
//imports all routes to be used in the app


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})