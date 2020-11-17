DROP DATABASE IF EXISTS images;
CREATE DATABASE images;

\c images;

CREATE TABLE IF NOT EXISTS image_urls (
  id SERIAL PRIMARY KEY,
  item_id INTEGER,
  image_url varchar
)