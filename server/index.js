const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const s3FileUpload = require('./../db/s3FileUpload.js');
//const cors = require('cors');
const multer  = require('multer');
const pool = require('./../db/index.js');
const controller = require('../controller/index.js');

const app = express();
const port = 3006;

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use('/items/:item_id', express.static('react-client/dist'));



app.get('/item/:item_id/images', (req, res)=> {
  const id = req.params.item_id;
  controller.images.getOne(id)
    .then((response) => {
      console.log(response)
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post('/item/:item_id/images', (req, res)=>{
  const id = req.body.id;
  const url = req.body.url;
  controller.images.post(id, url)
    .then((response) => {
      console.log(response.data)
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put('/item/:item_id/images', (req, res)=>{
  const index = req.body.index;
  const url = req.body.url;
  controller.images.update(index, url)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete('/item/:item_id/images', (req, res)=>{
  const index = req.body.index;
  controller.images.delete(index)
    .then((response) => {
      console.log(response.data)
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/item/images', (req, res)=>{
  pool.query('SELECT * FROM images', (err, data) => {
    if (err){
      res.status(400).send(err);
    } else {
      res.send(data)
    }
  });
});

app.get('/item/images/distinct', (req, res) => {
  pool.query('SELECT DISTINCT ON (item_id) item_id, image_url FROM images', (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data)
    }
  });
});


let storage = multer.memoryStorage();
let multipleUpload = multer({ storage: storage }).array('files');

app.post('/upload', multipleUpload, s3FileUpload.uploadToS3);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});