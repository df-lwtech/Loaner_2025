// Simple in-memory Item model
// Item: { id: number, name: string, description: string }

let _idCounter = 1;
const _items = [
  { id: _idCounter++, name: 'Sample Item', description: 'This is a sample item.' }
];

function list() {
  return _items;
}

function get(id) {
  return _items.find(it => it.id === Number(id)) || null;
}

function create({ name, description }) {
  if (!name || !description) {
    const err = new Error('name and description are required');
    err.status = 400;
    throw err;
  }
  const item = { id: _idCounter++, name, description };
  _items.push(item);
  return item;
}

module.exports = { list, get, create };
