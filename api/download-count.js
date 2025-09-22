import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get current count
    const count = await kv.get('download_count') || 0;
    res.status(200).json({ count });
  } else if (req.method === 'POST') {
    // Increment count
    let count = await kv.get('download_count') || 0;
    count++;
    await kv.set('download_count', count);
    res.status(200).json({ count });
  } else if (req.method === 'DELETE') {
    // Reset count
    await kv.set('download_count', 0);
    res.status(200).json({ count: 0 });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

