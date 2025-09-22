const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static HTML

const DATA_FILE = path.join(__dirname, 'data/downloads.json');

// Helper to read/write download count
function readCount() {
  if (!fs.existsSync(DATA_FILE)) return { count: 0 };
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}
function writeCount(countObj) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(countObj));
}

// Increment download
app.post('/increment', (req, res) => {
  const data = readCount();
  data.count += 1;
  writeCount(data);
  res.json(data);
});

// Get current count
app.get('/count', (req, res) => {
  const data = readCount();
  res.json(data);
});

// Reset count
app.post('/reset', (req, res) => {
  const data = { count: 0 };
  writeCount(data);
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running at https://pwcertificate.vercel.app/`));
