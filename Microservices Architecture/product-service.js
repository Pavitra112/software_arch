
// const express = require('express');
// const app = express();
// const products = [];

// app.use(express.json());

// app.post('/products', (req, res) => {
//   products.push(req.body);
//   res.status(201).send(req.body);
// });

// app.get('/products', (req, res) => {
//   res.send(products);
// });

// app.put('/products/:index', (req, res) => {
//   products[req.params.index] = req.body;
//   res.send(req.body);
// });

// app.delete('/products/:index', (req, res) => {
//   const deletedProduct = products.splice(req.params.index, 1);
//   res.send(deletedProduct);
// });

// app.listen(3002, () => {
//   console.log('Product Service is running on port 3002');
// });

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/microservices_products', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.put('/products/:id', async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedProduct);
});

app.delete('/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

app.listen(3002, () => {
  console.log('Product Service is running on port 3002');
});