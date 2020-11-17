//const process = require('../config/config.js');
const db = require('./index.js');

let urls = ['https://festy-images.s3-us-west-1.amazonaws.com/1_001.jpg',
            'https://festy-images.s3-us-west-1.amazonaws.com/1_002.jpg',
            'https://festy-images.s3-us-west-1.amazonaws.com/1_003.jpg',
            'https://festy-images.s3-us-west-1.amazonaws.com/1_004.jpg',
            'https://festy-images.s3-us-west-1.amazonaws.com/1_005.jpg',
          ];


const seed = (urls) => {
  //console.log(urls[0].slice(48, urls[0].indexOf('_')));
  //console.log(urls[0].indexOf('_'));
  for (let i = 0; i < urls.length; i++){
    let values = [parseInt(urls[i].slice(48, urls[i].indexOf('_'))), urls[i]];
    console.log(values);
    db.query('INSERT INTO image_urls (item_id, image_url) VALUES ($1, $2)', values, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`insert seller info successfully ${data.insertId}`);
      }
    });
  }
}

seed(urls);

//console.log(process);