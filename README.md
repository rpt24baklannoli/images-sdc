# ItemImages

_This component is an image carousel, which should dynamically render a product's images based on the url provided._

### Technologies Used: React Hooks, Postgres, Express, Webpack, AWS (S3, EC2)

--

To begin using this repo, please make sure to install postgres. I used homebrew where the documentation can be found [here](https://formulae.brew.sh/formula/postgresql). Please make sure to update the login credentials located within the index.js file of the **db** folder.


Make sure to run the following within the root directory:
```
npm i
```
Once the package lock has been created, please make sure to create a config folder in the root directory and create an **.env** file inside with the following key-value pairs:
```
ACCESS_KEY=(your access key)
SECRET_KEY=(your secret key)
```
Once those are set up, you should be able to access your amazon buckets. Within the **s3FileUpload.js** file, please make sure to update the bucket name that you are going to pull from. If you haven't already, create a bucket and upload some images you would like to use for some products, and give both the bucket and files within public read access.

Next, make sure to run the following:
```
npm db:setup
npm run react-dev
npm start
```
If no errors occur, then visit the following to check if the repo is working locally:

[http://localhost:3006/item/1]()

You can change the item id(1) to whatever number you'd like to render that particular items pictures.

# Database CRUD Operations

All operations will hit the following endpoint, but be determined by the type of request being made: **'/item/:item_id/images'**

### Read (GET)
> Looks for the item_id provided in the url and returns an array of objects with the following shape
```
"rows": [
        {
            "id": 1,
            "item_id": 1,
            "image_url": "https://fetsy-images-sdc.s3-us-west-1.amazonaws.com/photo-1611jpeg"
        },
        {
            "id": 2,
            "item_id": 1,
            "image_url": "https://fetsy-images-sdc.s3-us-west-1.amazonaws.com/photo-16113248.jpeg"
        },
        ...]
```
### Create (POST)
> Needs the request body to have these key-value pairs:
- (id): (the id of the item you would like to associate this image with).
- (url): (link to image url)(string)
```
 {
   id: 45
   url: http://exampleurl.com/123.jpeg
 }
```

### Update (PUT)
> Needs the request body to have these key-value pairs:
- (index): (id or index of image that you would like to update).
- (url): (link to image url)(string)
```
 {
   index: 621
   url: http://exampleurl.com/123.jpeg
 }
```

### Delete (DELETE)
> Needs the request body to have the following key-value pairs:
- (index): (id or index of image that you would like to delete from the database table: _images_):

```
 {index: 621}
```