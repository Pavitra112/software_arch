const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/mvc_architecture', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

app.use(itemRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});