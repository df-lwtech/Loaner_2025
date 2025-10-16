const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const fs = require('fs');
const itemsRouter = require('./routes/items');

// Middleware example
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Parse JSON bodies for API endpoints
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  const indexPath = path.join(clientBuildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.send('Welcome to Express!');
});

app.get('/about', (req, res) => {
  res.send('Default About page.');
});

app.get('/contact', (req, res) => {
  res.send('Contact page coming soon.');
});

// Simple API route for frontend consumption
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express API' });
});

// Items API (MVC style)
app.use('/api/items', itemsRouter);

// Serve static files from React build when available (production)
const clientBuildPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientBuildPath));

// Fallback to index.html for SPA routes if build exists (exclude /api)
app.get(/^\/(?!api).*/, (req, res, next) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'), (err) => {
    if (err) next();
  });
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