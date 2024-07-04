// const eventBus = require('./event-bus');
// const data = [];

// eventBus.on('create', (item) => {
//   data.push(item);
//   console.log('Item created:', item);
// });

// eventBus.on('read', () => {
//   console.log('Items:', data);
// });

// eventBus.on('update', (index, newItem) => {
//   data[index] = newItem;
//   console.log('Item updated:', newItem);
// });

// eventBus.on('delete', (index) => {
//   const deletedItem = data.splice(index, 1);
//   console.log('Item deleted:', deletedItem);
// });
const mongoose = require('mongoose');
const eventBus = require('./event-bus');

const itemSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const Item = mongoose.model('Item', itemSchema);

eventBus.on('create', async (item) => {
  const newItem = new Item(item);
  await newItem.save();
  console.log('Item created:', newItem);
});

eventBus.on('read', async (callback) => {
  const items = await Item.find();
  callback(items);
});

eventBus.on('update', async (id, newItem) => {
  const updatedItem = await Item.findByIdAndUpdate(id, newItem, { new: true });
  console.log('Item updated:', updatedItem);
});

eventBus.on('delete', async (id) => {
  const deletedItem = await Item.findByIdAndDelete(id);
  console.log('Item deleted:', deletedItem);
});