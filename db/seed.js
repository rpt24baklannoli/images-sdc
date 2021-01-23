const db = require('./index.js');
const S3 = require('./s3FileUpload.js');

const seed =  async () => {

  let urls = await S3.getUrlsS3();
  console.log(urls);
  for (let i = 0; i < 100; i++){
    let itemId = i + 1;
    for ( let j = 0; j < 5; j++) {
      randomIndex = Math.floor(Math.random() * urls.length)
      let currentValue = urls[randomIndex];
      let values =[itemId, currentValue];
      db.query('INSERT INTO images (item_id, image_url) VALUES ($1, $2)', values, (err, data) => {
        if (err) { console.error(err) }
      });
    }
  }
}

seed();

