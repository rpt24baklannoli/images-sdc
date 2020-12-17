const db = require('./index.js');
const S3 = require('./s3FileUpload.js');

const seed =  async () => {

  let urls = await S3.getUrlsS3();
  for (let i = 0; i < urls.length; i++){
    let values = [parseInt(urls[i].slice(48, urls[i].indexOf('_'))), urls[i]];
    console.log(isNaN(values[0]));
    if(!isNaN(values[0])){
      db.query('INSERT INTO image_urls (item_id, image_url) VALUES ($1, $2)', values, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`insert image info successfully`);
        }
      });
    }
  }
}

seed();

