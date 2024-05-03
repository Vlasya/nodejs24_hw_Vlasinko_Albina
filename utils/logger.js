const { bgGreen, bgYellow, bgRed, enable, disable } = require('colors/safe');
const { LEVEL_TYPES } = require('../constants');
const config = require('config');
const path = require('path');
const fs = require('fs');

let loggerInstance;

const getMessageWithDateTime = (moduleName, ...args) => {
  const timestamp = new Date().toISOString();
  return `${timestamp} - ${moduleName}: ${args.join(' ')}\n`;
};

function logger(moduleName) {
  if (!loggerInstance) {
    const { colorIsEnable, logLevel } = config;

    const isWarnLevel = logLevel === LEVEL_TYPES.WARN;
    const isInfoLevel = logLevel === LEVEL_TYPES.INFO;

    try {
      const logDirectory = path.join(__dirname, '../logs');

      if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
      }

      const infoStream = fs.createWriteStream(`${logDirectory}/info.log`, {
        flags: 'a',
      });
      const errorStream = fs.createWriteStream(`${logDirectory}/error.log`, {
        flags: 'a',
      });

      colorIsEnable ? enable() : disable();
      return {
        info: (...args) => {
          infoStream.write(getMessageWithDateTime(moduleName, ...args));
          if (isInfoLevel) {
            console.log(bgGreen(`${moduleName}:`), ...args);
          }
        },
        warn: (...args) => {
          errorStream.write(getMessageWithDateTime(moduleName, ...args));
          if (isWarnLevel || isInfoLevel) {
            console.warn(bgYellow(`${moduleName}:`), ...args);
          }
        },
        error: (...args) => {
          console.error(bgRed(`${moduleName}:`), ...args);
          errorStream.write(getMessageWithDateTime(moduleName, ...args));
        },
      };
    } catch (error) {
      console.error('Error creating log streams:', error);
      loggerInstance = {
        info: (...args) => console.log(bgGreen(`${moduleName}:`), ...args),
        warn: (...args) => console.warn(bgYellow(`${moduleName}:`), ...args),
        error: (...args) => console.error(bgRed(`${moduleName}:`), ...args),
      };
    }
  }
  return loggerInstance;
}

process.on('beforeExit', () => {
  if (loggerInstance) {
    loggerInstance.infoStream.end();
    loggerInstance.errorStream.end();
  }
});

module.exports = logger;
