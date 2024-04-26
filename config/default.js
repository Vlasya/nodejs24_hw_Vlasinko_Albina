const dotenv = require('dotenv');
const { COLORS_TYPES, LEVEL_TYPES } = require('../constants');


dotenv.config();

module.exports = {
  colorIsEnable: process.env.COLORS_ENABLED || COLORS_TYPES.INACTIVE,
  logLevel: process.env.LOG_LEVEL || LEVEL_TYPES.WARN
};
