const S3 = require('../s3FileUpload.js');
const fs = require('fs');

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const writeCSV =  async (numberOfItemsToSeed) => {
  let writer = fs.createWriteStream('./db/seeding/seedData.csv');
  writer.write(`item_id,image_url\n`)

  let urls;

  try {
    //for user with credentials
    urls = await S3.getUrlsS3();
  } catch {
    //for dummy urls
    urls = [
    "https://fetsy-images-sdc.s3-us-west-1.amazonaws.com/photo-1527613426441-4da17471b66d.jpeg",
    "https://fetsy-images-sdc.s3-us-west-1.amazonaws.com/photo-1595824228556-440f8776f97d.jpeg",
    "https://fetsy-images-sdc.s3-us-west-1.amazonaws.com/photo-1576497065840-32541d4780c5.jpeg",
    "https://fetsy-images-sdc.s3-us-west-1.amazonaws.com/photo-1549187774-b4e9b0445b41.jpeg",
    "https://fetsy-images-sdc.s3-us-west-1.amazonaws.com/photo-1525459819821-1c2d33189e23.jpeg"
    ];
  }

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
writeCSV(100);