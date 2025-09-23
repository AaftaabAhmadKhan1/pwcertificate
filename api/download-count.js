import fs from 'fs';
import path from 'path';

const COUNT_FILE = path.join(process.cwd(), 'data/downloads.json');

function readCount() {
  if (!fs.existsSync(COUNT_FILE)) return 0;
  const data = fs.readFileSync(COUNT_FILE, 'utf8');
  try {
    return JSON.parse(data).count || 0;
  } catch {
    return 0;
  }
}

function writeCount(count) {
  // Ensure the data directory exists
  const dataDir = path.dirname(COUNT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(COUNT_FILE, JSON.stringify({ count }));
}

export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const count = readCount();
      res.status(200).json({ count });
    } else if (req.method === 'POST') {
      let count = readCount();
      count++;
      writeCount(count);
      res.status(200).json({ count });
    } else if (req.method === 'DELETE') {
      writeCount(0);
      res.status(200).json({ count: 0 });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
