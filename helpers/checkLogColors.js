const checkColor = (hasColor, color, moduleName) =>
  hasColor ? color(`${moduleName}:`) : `${moduleName}:`;

module.exports = checkColor;
