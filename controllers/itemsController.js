const Item = require('../models/item');

async function listItems(req, res) {
  res.json(Item.list());
}

async function getItem(req, res) {
  const item = Item.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

async function createItem(req, res) {
  try {
    const item = Item.create({ name: req.body.name, description: req.body.description });
    res.status(201).json(item);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
  }
}

module.exports = { listItems, getItem, createItem };
