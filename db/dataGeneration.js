const db = require('./index.js');
const S3 = require('./s3FileUpload.js');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter({ headers: ['item_id', 'image_url']});


const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const writeCSV =  async (numberOfItemsToSeed) => {
  writer.pipe(fs.createWriteStream('./db/seedData.csv'));
  let urls = await S3.getUrlsS3();

  for (let i = 0; i < numberOfItemsToSeed; i++){
    let itemId = i + 1;
    let numberOfPhotos = randomNumber(3,7);
    for ( let j = 0; j < numberOfPhotos; j++) {
      let randomIndex = randomNumber(0, urls.length);
      let currentValue = urls[randomIndex];
      let values = [itemId, currentValue];
      //console.log(values);
      writer.write(values);
      // db.query('INSERT INTO images (item_id, image_url) VALUES ($1, $2)', values, (err, data) => {
        //   if (err) { console.error(err) }
        // });
      }
    }
    writer.end();
}

//input desired number
writeCSV();



