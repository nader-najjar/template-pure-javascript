import http from 'node:http';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = http.createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Hello from template-pure-javascript\n');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

