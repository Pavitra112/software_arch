const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.get('/items', itemController.getItems);
router.post('/items', itemController.createItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;