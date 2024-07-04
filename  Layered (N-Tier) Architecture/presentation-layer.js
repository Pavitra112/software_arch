// const express = require('express');
// const businessLayer = require('./business-layer');
// const app = express();

// app.use(express.json());

// app.post('/items', (req, res) => {
//   const item = businessLayer.create(req.body);
//   res.status(201).send(item);
// });

// app.get('/items', (req, res) => {
//   const items = businessLayer.read();
//   res.send(items);
// });

// app.put('/items/:index', (req, res) => {
//   const updatedItem = businessLayer.update(req.params.index, req.body);
//   res.send(updatedItem);
// });

// app.delete('/items/:index', (req, res) => {
//   const deletedItem = businessLayer.delete(req.params.index);
//   res.send(deletedItem);
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

const express = require('express');
const mongoose = require('mongoose');
const businessLayer = require('./business-layer');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/layered_architecture', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/items', async (req, res) => {
  const item = await businessLayer.create(req.body);
  res.status(201).send(item);
});

app.get('/items', async (req, res) => {
  const items = await businessLayer.read();
  res.send(items);
});

app.put('/items/:id', async (req, res) => {
  const updatedItem = await businessLayer.update(req.params.id, req.body);
  res.send(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  const deletedItem = await businessLayer.delete(req.params.id);
  res.send(deletedItem);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});