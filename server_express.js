const rfs = require('rotating-file-stream');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const logger = require('./utils/logger')('server_express');

const { server: serverConfig } = require('config');
const { userRouter } = require('./routers/users');



const app = express();

app.listen(serverConfig.port, () =>
  logger.info(`server is listening on [${serverConfig.port}] port`)
);

// morgan and rotating-file-stream  for logs
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs'),
});

const accessConsoleLogger = morgan(':date :method :url :status');

app.use(accessConsoleLogger);
app.use(morgan('combined', { stream: accessLogStream }));


const jsonBodyParser = express.json();
app.use(jsonBodyParser);

app.use('/users', userRouter);

app.get('/health-check', (_req, resp) => {
  resp.send('Healthcheck passed');
});
