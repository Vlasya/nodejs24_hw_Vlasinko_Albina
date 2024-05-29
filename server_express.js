const rfs = require('rotating-file-stream');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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

app.set('view engine', 'pug');

const accessConsoleLogger = morgan(':date :method :url :status');

app.use(accessConsoleLogger);
app.use(morgan('combined', { stream: accessLogStream }));

// serving static assets
app.use(express.static('static'));

const jsonBodyParser = express.json();
app.use(jsonBodyParser);

app.use('/users', cors(), userRouter);

app.get('/health-check', (_req, resp) => {
  resp.send('Healthcheck passed');
});

app.get('/pug', (req, resp) => {
  resp.render('index');
});
