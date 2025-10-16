const express = require('express');
const router = express.Router();
const { listItems, getItem, createItem } = require('../controllers/itemsController');

router.get('/', listItems);
router.get('/:id', getItem);
router.post('/', createItem);

module.exports = router;
