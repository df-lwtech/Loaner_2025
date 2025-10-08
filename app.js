const express = require('express');
const app = express();
const PORT = 8080;

// Middleware example
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

app.get('/about', (req, res) => {
  res.send('Default About page.');
});

app.get('/contact', (req, res) => {
  res.send('Contact page coming soon.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const server = app.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    process.exit(0);
  });
});