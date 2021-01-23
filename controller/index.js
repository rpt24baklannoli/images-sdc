const model = require('../model/index.js');

module.exports = {
  images: {
    getOne: (id) => {
      return new Promise ((resolve, reject) => {
        model.images.getOne(id)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    post: (id, url) => {
      return new Promise ((resolve, reject) => {
        model.images.post(id, url)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    update: (index, url) => {
      return new Promise ((resolve, reject) => {
        model.images.update(index, url)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    delete: (index) => {
      return new Promise ((resolve, reject) => {
        model.images.delete(index)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err)
        });
      });
    }
  }
}