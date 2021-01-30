const S3 = require('../s3FileUpload.js');
const fs = require('fs');

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const writeCSV =  async (numberOfItemsToSeed) => {
  let writer = fs.createWriteStream('./db/seeding/seedData.csv');
  writer.write(`item_id,image_url\n`)
  let urls = await S3.getUrlsS3();

  for (let i = 0; i < numberOfItemsToSeed; i++){
    let itemId = i + 1;
    let numberOfPhotos = randomNumber(3,7);
    for ( let j = 0; j < numberOfPhotos; j++) {
      let randomIndex = randomNumber(0, urls.length);
      let currentValue = urls[randomIndex];
      writer.write(`${itemId},${currentValue}\n`);
    }
  }
  writer.end();
}

//input desired number as parameter
writeCSV(10000000);