// server.js - Lightweight static server using Node.js built-ins
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 8000;
const ROOT = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0].split('#')[0];
  if (cleanUrl === '/') cleanUrl = '/index.html';

  const filePath = path.join(ROOT, cleanUrl);

  // Security: prevent directory traversal outside root
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + cleanUrl);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Naapu game running at http://localhost:${PORT}/`);
});
