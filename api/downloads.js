// Simple counter API following Vercel docs exactly
let count = 4;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({ count: count });
  } else if (req.method === 'POST') {
    count++;
    res.status(200).json({ count: count });
  } else if (req.method === 'DELETE') {
    count = 0;
    res.status(200).json({ count: 0 });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}