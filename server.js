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
  // Ensure the data directory exists
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(countObj));
}

// API endpoint to match serverless function
app.all('/api/download-count', (req, res) => {
  if (req.method === 'GET') {
    const data = readCount();
    res.json(data);
  } else if (req.method === 'POST') {
    const data = readCount();
    data.count += 1;
    writeCount(data);
    res.json(data);
  } else if (req.method === 'DELETE') {
    const data = { count: 0 };
    writeCount(data);
    res.json(data);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
});

// Legacy endpoints for backward compatibility
app.post('/increment', (req, res) => {
  const data = readCount();
  data.count += 1;
  writeCount(data);
  res.json(data);
});

app.get('/count', (req, res) => {
  const data = readCount();
  res.json(data);
});

app.post('/reset', (req, res) => {
  const data = { count: 0 };
  writeCount(data);
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running at https://pwcertificate.vercel.app/`));
