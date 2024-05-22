const dotenv = require('dotenv');
const { COLORS_TYPES, LEVEL_TYPES } = require('../constants/logger');

dotenv.config();

module.exports = {
  logger: {
    colorIsEnable: !!+process.env.COLORS_ENABLED || COLORS_TYPES.INACTIVE,
    logLevel: process.env.LOG_LEVEL || LEVEL_TYPES.WARN,
  },
  server: {
    port: process.env.PORT || 3000,
  },
};
