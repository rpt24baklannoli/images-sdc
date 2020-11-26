const express = require('express');
const bodyParser = require('body-parser');
const s3FileUpload = require('./../db/s3FileUpload.js');
const cors = require('cors');
const multer  = require('multer');
const pool = require('./../db/index.js');
const app = express();
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
  });
});


app.get('/item/:item_id/images', (req, res)=>{
  //console.log(req.params);
  //console.log()
  //let text = 'SELECT * FROM image_urls WHERE image_id = ($1)'
  const values = [`${req.params.item_id}`];
  //console.log(values);
  pool.query(`SELECT * FROM image_urls WHERE item_id = ${req.params.item_id}`, (err,data) => {
    if (err){
      res.status(400).send(err);
    } else {
      console.log(data.rows);
      res.status(200).send(data.rows);
    }
  });
})




let storage = multer.memoryStorage();
let multipleUpload = multer({ storage: storage }).array('files');

app.post('/upload', multipleUpload, s3FileUpload.uploadToS3);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})