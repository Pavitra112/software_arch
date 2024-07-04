// const dataAccessLayer = require('./data-access-layer');

// class BusinessLayer {
//   create(item) {
//     // Business logic can be added here
//     return dataAccessLayer.create(item);
//   }

//   read() {
//     return dataAccessLayer.read();
//   }

//   update(index, newItem) {
//     // Business logic can be added here
//     return dataAccessLayer.update(index, newItem);
//   }

//   delete(index) {
//     return dataAccessLayer.delete(index);
//   }
// }

// module.exports = new BusinessLayer();
const dataAccessLayer = require('./data-access-layer');

class BusinessLayer {
  async create(item) {
    return await dataAccessLayer.create(item);
  }

  async read() {
    return await dataAccessLayer.read();
  }

  async update(id, newItem) {
    return await dataAccessLayer.update(id, newItem);
  }

  async delete(id) {
    return await dataAccessLayer.delete(id);
  }
}

module.exports = new BusinessLayer();