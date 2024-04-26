const { bgGreen, bgYellow, bgRed } = require('colors/safe');
const { LEVEL_TYPES } = require('../constants');
const checkColor = require('../helpers/checkLogColors');
const config = require('config');

function logger(moduleName) {
  const colorIsActive = !!+config.colorIsEnable;

  const warn = config.logLevel === LEVEL_TYPES.WARN;
  const info = config.logLevel === LEVEL_TYPES.INFO;

  return {
    info: (...args) => {
      if (info) {
        console.log(checkColor(colorIsActive, bgGreen, moduleName), ...args);
      }
    },
    warn: (...args) => {
      if (warn || info) {
        console.warn(checkColor(colorIsActive, bgYellow, moduleName), ...args);
      }
    },
    error: (...args) => {
      console.error(checkColor(colorIsActive, bgRed, moduleName), ...args);
    },
  };
}

module.exports = logger;
