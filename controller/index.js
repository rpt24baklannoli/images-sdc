module.exports = {
  images: {
    get: (id) => {
      return new Promise ((resolve, reject) => {
        model.images.get(id)
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