const S3 = require('../s3FileUpload.js');
const fs = require('fs');

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const writeCSV =  async (numberOfItemsToSeed) => {
  let writer = fs.createWriteStream('./db/seeding/seedData2.csv');
  writer.write(`item_id,image_urls\n`)
  let urls = await S3.getUrlsS3();

  for (let i = 0; i < numberOfItemsToSeed; i++) {
    let itemId = i + 1;
    let imageUrls = [];
    let numberOfPhotos = randomNumber(3,7);
    for ( let j = 0; j < numberOfPhotos; j++) {
      let randomIndex = randomNumber(0, urls.length);
      let currentValue = urls[randomIndex];
      imageUrls.push(currentValue);
    }
    writer.write(`${itemId}|{${imageUrls}}\n`);
  }

  writer.end();
}

//input desired number as parameter
writeCSV(10);



