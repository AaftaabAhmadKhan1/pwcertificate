// Simple in-memory counter (resets on deployment)
// For production, consider using a database like Vercel KV, PostgreSQL, etc.
let downloadCount = 4; // Starting with current count from your data file

function readCount() {
  return downloadCount;
}

function writeCount(count) {
  downloadCount = count;
}

module.exports = function handler(req, res) {
  console.log('API called:', req.method, req.url);
  
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
      console.log('GET request, returning count:', count);
      res.status(200).json({ count });
    } else if (req.method === 'POST') {
      let count = readCount();
      count++;
      writeCount(count);
      console.log('POST request, new count:', count);
      res.status(200).json({ count });
    } else if (req.method === 'DELETE') {
      writeCount(0);
      console.log('DELETE request, reset count to 0');
      res.status(200).json({ count: 0 });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
