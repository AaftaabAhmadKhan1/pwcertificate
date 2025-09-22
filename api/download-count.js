let count = 0;

export default function handler(req, res) {
  if (req.method === 'POST') {
    count++;
    res.status(200).json({ count });
  } else if (req.method === 'GET') {
    res.status(200).json({ count });
  } else if (req.method === 'DELETE') {
    count = 0;
    res.status(200).json({ count });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
