const http = require('http');
const PORT = 8124;

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World!\n');
}).listen(PORT);

console.log('Server running at http://localhost:${PORT}/'); #なぜかportが変数のまま表示されてしまった
