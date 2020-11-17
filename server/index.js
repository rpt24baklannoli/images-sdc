const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./../db/index.js');
const port = 3006;

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/item/images', (req, res)=>{
  pool.query('SELECT * FROM image_urls', (err, data) => {
    if (err){
      res.status(400).send(err);
    } else {
      res.status(200).send(data)
    }
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})