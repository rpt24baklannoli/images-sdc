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
app.use('/items/:item_id', express.static(__dirname + '/../react-client/dist'));

app.get('/items/:item_id/images', (req, res) => {
  const id = req.params.item_id;
  controller.images.getOne(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post('/items/:item_id/images', (req, res) => {
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

app.put('/items/:item_id/images/:image_id', (req, res) => {
  const image_id = req.params.image_id;
  const url = req.body.url;
  controller.images.update(image_id, url)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete('/items/:item_id/images/:image_id', (req, res) => {
  const image_id = req.params.image_id;
  controller.images.delete(image_id)
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

app.get('/items/images/distinct', (req, res) => {
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