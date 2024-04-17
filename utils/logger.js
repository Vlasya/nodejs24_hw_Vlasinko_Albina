function info(filename, message) {
  console.log(`${filename} : ${message}`);
}

function warn(filename, message) {
  console.log(`${filename} : ${message}`);
}

function error(filename, message) {
  console.log(`${filename} : ${message}`);
}

function logger(filename) {
  return {
    info: (message) => info(filename, message),
    warn: (message) => warn(filename, message),
    error: (message) => error(filename, message),
  };
}

module.exports = logger;
