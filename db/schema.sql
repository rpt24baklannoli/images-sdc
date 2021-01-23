-- DROP DATABASE IF EXISTS images;
-- CREATE DATABASE images;

DROP DATABASE IF EXISTS fetsy;
CREATE DATABASE fetsy;
--\fetsy
\c fetsy;

-- CREATE TABLE IF NOT EXISTS image_urls (
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  item_id INTEGER,
  image_url varchar
)