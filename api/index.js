// Alternative API endpoint using index.js format
// Simple in-memory counter for demonstration
let downloadCount = 4;

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        res.status(200).json({ count: downloadCount });
        break;
      case 'POST':
        downloadCount++;
        res.status(200).json({ count: downloadCount });
        break;
      case 'DELETE':
        downloadCount = 0;
        res.status(200).json({ count: 0 });
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};