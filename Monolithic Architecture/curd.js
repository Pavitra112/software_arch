const express = require('express');
const mongoose = require('mongoose');

const app = express();
const itemSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const Item = mongoose.model('Item', itemSchema);

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/monolithic_architecture', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).send(item);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.put('/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  res.send(deletedItem);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
