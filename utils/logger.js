const { bgGreen, bgYellow, bgRed, enable, disable } = require('colors/safe');
const { LEVEL_TYPES } = require('../constants');
const checkColor = require('../helpers/checkLogColors');
const config = require('config');

function logger(moduleName) {
  const { colorIsEnable, logLevel } = config;

  const isWarnLevel = logLevel === LEVEL_TYPES.WARN;
  const isInfoLevel = logLevel === LEVEL_TYPES.INFO;

  colorIsEnable ? enable() : disable();
  return {
    info: (...args) => {
      if (isInfoLevel) {
        console.log(bgGreen(`${moduleName}:`), ...args);
      }
    },
    warn: (...args) => {
      if (isWarnLevel || isInfoLevel) {
        console.warn(bgYellow(`${moduleName}:`), ...args);
      }
    },
    error: (...args) => {
      console.error(bgRed(`${moduleName}:`), ...args);
    },
  };
}

module.exports = logger;
