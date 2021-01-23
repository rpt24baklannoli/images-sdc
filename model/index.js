const pool = require('../db/index.js');

module.exports = {
  images: {
    getOne: (item_id) => {
      return pool.query(`SELECT * FROM images WHERE item_id = ${item_id};`)
    },
    post: (item_id, url) => {
      return pool.query(`INSERT INTO images (item_id, image_url) VALUES (${item_id}, ${url});`);
    },
    update: (record_id, url) => {
      return pool.query(`UPDATE images SET image_url = ${url} WHERE id = ${record_id} RETURNING *;`);
    },
    delete: (record_id) => {
      return pool.query(`DELETE FROM images WHERE id = ${record_id};`);
    }
  }
}