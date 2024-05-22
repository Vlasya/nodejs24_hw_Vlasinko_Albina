const http = require('http');
const { ENDPOINTS, METHODS } = require('./constants/api');

const logger = require('./utils/logger')('server');
const { server: serverConfig } = require('config');

const PORT = serverConfig.port;

const server = http.createServer();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('request', (req, resp) => {
  const { method, url } = req;

  if (url === ENDPOINTS.healthcheck && method === METHODS.GET) {
    resp.writeHead(200, { 'Content-Type': 'text/plain' });
    logger.info(`${req.method} ${req.url} 200`);
    resp.end('healthcheck passed');
    return;
  }

  resp.writeHead(404, { 'Content-Type': 'text/plain' });
  logger.warn(`${req.method} ${req.url} 404`);
  resp.end();
});
