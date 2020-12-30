const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.loadFromPath('/Users/brian.vu/HackReactor/RPT24/fetsyItemImages/config/AWS_Config.json');

const BUCKET_NAME = 'festy-images';
const IAM_USER_KEY = AWS.config.credentials.accessKeyId || process.env.accessKey;
const IAM_USER_SECRET = AWS.config.credentials.secretAccessKey || process.env.secretKey;

let uploadToS3 = (req, res)=>{

  const files = req.files;

  AWS.config.setPromisesDependency();
  AWS.config.update({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    region: 'us-west-1'
  });

  const s3bucket = new AWS.S3();
  files.forEach( (file, index)=>{

    let params = {
      ACL: 'public-read',
      ContentType: 'image/jpeg',
      Bucket: BUCKET_NAME,
      Body: file.buffer,
      Key: `${file.originalname}`
    };

    s3bucket.upload(params, (err, data)=> {
      if (err) {
        console.log('ERROR ', err)
        res.json({ "error": true, "Message": err});
      } else {
        if(index+1 === files.length){
          res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: data});
        }
      }
    });
  });

};

async function getUrlsS3 (URL_ARRAY = []) {

  const BUCKET_URL = 'https://festy-images.s3-us-west-1.amazonaws.com/';

  AWS.config.update({
    region: 'us-west-1'
  });

  const s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    region: 'us-west-1'
  });

  let params = {
    Bucket: BUCKET_NAME,
  };

  const response = await s3bucket.listObjectsV2(params).promise();

  URL_ARRAY = response.Contents.map( (file) => {
    let complete_url = BUCKET_URL+file.Key;
    return complete_url;
    });
  //console.log('URL_ARRAY, ', URL_ARRAY)

  if (URL_ARRAY.length === response.Contents.length){
    //console.log('URL_ARRAY ', URL_ARRAY);
    return URL_ARRAY;
  }
}


module.exports = {uploadToS3, getUrlsS3, router};
