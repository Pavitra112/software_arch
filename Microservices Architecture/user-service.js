
// const express = require('express');
// const app = express();
// const users = [];

// app.use(express.json());

// app.post('/users', (req, res) => {
//   users.push(req.body);
//   res.status(201).send(req.body);
// });

// app.get('/users', (req, res) => {
//   res.send(users);
// });

// app.put('/users/:index', (req, res) => {
//   users[req.params.index] = req.body;
//   res.send(req.body);
// });

// app.delete('/users/:index', (req, res) => {
//   const deletedUser = users.splice(req.params.index, 1);
//   res.send(deletedUser);
// });

// app.listen(3001, () => {
//   console.log('User Service is running on port 3001');
// });

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/microservices_users', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.send(deletedUser);
});

app.listen(3001, () => {
  console.log('User Service is running on port 3001');
});