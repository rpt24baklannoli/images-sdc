const pool = require('../db/index.js');

module.exports = {
  images: {
    getOne: (item_id) => {
      let values = [item_id];
      return pool.query(`SELECT * FROM images WHERE item_id = ($1);`, values);
    },
    getAll: () => {
      return pool.query(`SELECT * FROM images;`);
    },
    getDistinct: () => {
      return pool.query('SELECT DISTINCT ON (item_id) item_id, image_url FROM images');
    },
    post: (item_id, url) => {
      let values = [item_id, url];
      return pool.query(`INSERT INTO images (item_id, image_url) VALUES ($1,$2) RETURNING *;`, values);
    },
    update: (record_id, url) => {
      let values = [url, record_id];
      return pool.query(`UPDATE images SET image_url = ($1) WHERE id = ($2) RETURNING *;`, values);
    },
    delete: (record_id) => {
      let values = [record_id];
      return pool.query(`DELETE FROM images WHERE id = ($1) RETURNING *;`, values);
    }
  }
}