DROP DATABASE IF EXISTS fetsy;
CREATE DATABASE fetsy;
\c fetsy;

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  item_id INTEGER,
  image_url varchar(150)
)

CREATE INDEX inx_item_id ON images(item_id);


-- DROP DATABASE IF EXISTS fetsy;
-- CREATE DATABASE fetsy;
-- \c fetsy;

-- CREATE TABLE IF NOT EXISTS images (
--   id SERIAL PRIMARY KEY,
--   item_id INTEGER,
--   image_urls varchar(150)[]
-- )