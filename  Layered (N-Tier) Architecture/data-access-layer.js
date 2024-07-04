// const data = [];

// class DataAccessLayer {
//   create(item) {
//     data.push(item);
//     return item;
//   }

//   read() {
//     return data;
//   }

//   update(index, newItem) {
//     data[index] = newItem;
//     return newItem;
//   }

//   delete(index) {
//     return data.splice(index, 1);
//   }
// }

// module.exports = new DataAccessLayer();

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const Item = mongoose.model('Item', itemSchema);

class DataAccessLayer {
  async create(item) {
    const newItem = new Item(item);
    await newItem.save();
    return newItem;
  }

  async read() {
    return await Item.find();
  }

  async update(id, newItem) {
    return await Item.findByIdAndUpdate(id, newItem, { new: true });
  }

  async delete(id) {
    return await Item.findByIdAndDelete(id);
  }
}

module.exports = new DataAccessLayer();
