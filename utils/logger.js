const { bgGreen, bgYellow, bgRed, enable, disable } = require('colors/safe');
const { LEVEL_TYPES } = require('../constants');
const config = require('config');
const path = require('path');
const fs = require('fs');

const getMessageWithDateTime = (moduleName, ...args) => {
  const timestamp = new Date().toISOString();
  return `${timestamp} - ${moduleName}: ${args.join(' ')}\n`;
};

const { colorIsEnable, logLevel } = config;

const isWarnLevel = logLevel === LEVEL_TYPES.WARN;
const isInfoLevel = logLevel === LEVEL_TYPES.INFO;

const logStreams = {
  info: null,
  error: null,
};

try {
  const logDirectory = path.join(__dirname, '../logs');

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  logStreams.info = fs.createWriteStream(`${logDirectory}/info.log`, {
    flags: 'a',
  });
  logStreams.error = fs.createWriteStream(`${logDirectory}/error.log`, {
    flags: 'a',
  });
} catch (error) {
  console.error('Error creating log streams:', error);
  process.exit(1);
}

colorIsEnable ? enable() : disable();

function logger(moduleName) {
  return {
    info: (...args) => {
      logStreams.info.write(getMessageWithDateTime(moduleName, ...args));
      if (isInfoLevel) {
        console.log(bgGreen(`${moduleName}:`), ...args);
      }
    },
    warn: (...args) => {
      logStreams.error.write(getMessageWithDateTime(moduleName, ...args));
      if (isWarnLevel || isInfoLevel) {
        console.warn(bgYellow(`${moduleName}:`), ...args);
      }
    },
    error: (...args) => {
      logStreams.error.write(getMessageWithDateTime(moduleName, ...args));
      console.error(bgRed(`${moduleName}:`), ...args);
    },
  };
}

process.on('beforeExit', () => {
  logStreams.info?.end();
  logStreams.error?.end();
});

module.exports = logger;
