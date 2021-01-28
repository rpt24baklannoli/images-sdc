DROP DATABASE IF EXISTS fetsy;
CREATE DATABASE fetsy;
\c fetsy;

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  item_id INTEGER,
  image_url varchar(150)
)