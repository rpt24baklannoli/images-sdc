const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const s3FileUpload = require('./../db/s3FileUpload.js');
const pool = require('./../db/index.js');
const controller = require('../controller/index.js');
const app = express();

const redis = require('redis');
const client = redis.createClient();
// client.on('error', (err) => {
//   console.log("Error " + err);
// });
client.on('connect', (err) => {
  console.log("Connected to redis");
});

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/items/:item_id', express.static(__dirname + '/../react-client/dist'));

app.get('/items/:item_id/images', (req, res) => {
  const id = req.params.item_id;
  return client.get(`images:${id}`, (err, result) => {
    if (err) {
      return res.status(500).send(error);
    }
    if (result) {
      return res.send(JSON.parse(result));
    } else {
      controller.images.getOne(id)
        .then((response) => {
          client.set(`images:${id}`, JSON.stringify(response));
          return res.send(response);
        })
        .catch((error) => {
          return res.status(400).send(error);
        });
    }
  })
});

app.post('/items/:item_id/images', (req, res) => {
  const id = req.params.item_id;
  const url = req.body.url;
  controller.images.post(id, url)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
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

// app.get('/items/images', (req, res) => {
//   controller.images.getAll()
//     .then((response) => {
//       res.send(response.rows);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

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

module.exports = app;