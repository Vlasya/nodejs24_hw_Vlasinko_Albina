const logger = require('./utils/logger')('main');

const fileSync = require('./file_sync');

fileSync.start();

logger.info('The script is running!');
logger.warn('The warn script is running!');
logger.error('The error script is running!');
