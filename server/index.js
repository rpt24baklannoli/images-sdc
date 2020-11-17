const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const port = 3006;

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})