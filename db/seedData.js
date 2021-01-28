const db = require('./index.js');

const insertData = async () => {
  let csv = __dirname + '/seedData.csv';
  let query = `COPY images (item_id, image_url) FROM '${csv}' DELIMITER ',' CSV HEADER;`
  // let query = "COPY images (item_id, image_url) FROM '/Users/gabriel.g/Desktop/fetsyItemImages/db/seedData.csv' WITH DELIMITER ',' CSV HEADER;"

  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully inserted csv data');
    }
  });
}

insertData();