const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const s3FileUpload = require('./../db/s3FileUpload.js');
const pool = require('./../db/index.js');
const controller = require('../controller/index.js');
const app = express();
const port = 3006;

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/item/:item_id', express.static(__dirname + '/../react-client/dist'));

app.get('/item/:item_id/images', (req, res) => {
  const id = req.params.item_id;
  controller.images.getOne(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post('/item/:item_id/images', (req, res) => {
  const id = req.body.id;
  const url = req.body.url;
  controller.images.post(id, url)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put('/item/:item_id/images', (req, res) => {
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

app.delete('/item/:item_id/images', (req, res) => {
  const index = req.body.index;
  controller.images.delete(index)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/items/images', (req, res) => {
  controller.images.getAll()
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/item/images/distinct', (req, res) => {
  controller.images.getDistinct()
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


let storage = multer.memoryStorage();
let multipleUpload = multer({ storage: storage }).array('files');

app.post('/upload', multipleUpload, s3FileUpload.uploadToS3);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});