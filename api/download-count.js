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
  fs.writeFileSync(COUNT_FILE, JSON.stringify({ count }));
}

export default function handler(req, res) {
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
}
