const Item = require('../models/item');

exports.createItem = async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect('/items');
};

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.render('items', { items });
};

exports.updateItem = async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/items');
};

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/items');
};