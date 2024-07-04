// const eventBus = require('./event-bus');
// const express = require('express');
// const app = express();

// app.use(express.json());

// app.post('/items', (req, res) => {
//   eventBus.emit('create', req.body);
//   res.status(201).send(req.body);
// });

// app.get('/items', (req, res) => {
//   eventBus.emit('read');
//   res.send(data);
// });

// app.put('/items/:index', (req, res) => {
//   eventBus.emit('update', req.params.index, req.body);
//   res.send(req.body);
// });

// app.delete('/items/:index', (req, res) => {
//   eventBus.emit('delete', req.params.index);
//   res.send(req.body);
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
const express = require('express');
const mongoose = require('mongoose');
const eventBus = require('./event-bus');
require('./event-handlers');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/event_driven_architecture', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/items', (req, res) => {
  eventBus.emit('create', req.body);
  res.status(201).send(req.body);
});

app.get('/items', (req, res) => {
  eventBus.emit('read', (items) => {
    res.send(items);
  });
});

app.put('/items/:id', (req, res) => {
  eventBus.emit('update', req.params.id, req.body);
  res.send(req.body);
});

app.delete('/items/:id', (req, res) => {
  eventBus.emit('delete', req.params.id);
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});