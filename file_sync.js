const fsAsync = require('fs/promises');
const path = require('path');
const logger = require('./utils/logger')('file_sync');

const fileExists = async (filePath) => {
  try {
    await fsAsync.access(filePath);
    return true; // Файл існує
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false; // Файл не існує
    } else {
      throw error; // Інша помилка доступу
    }
  }
};

const copyFile = async (sourcePath, targetPath) => {
  fileExists(targetPath).then((exists) => {
    if (exists) {
      logger.warn(`${targetPath} існує`);
    } else {
      (async () => {
        try {
          await fsAsync.copyFile(sourcePath, targetPath);
          logger.info(
            `Файл "${sourcePath}" успішно скопійовано до "${targetPath}"`
          );
        } catch (error) {
          logger.error(
            `Помилка при копіюванні файлу "${sourcePath}" до "${targetPath}": ${error.message}`
          );
        }
      })();
    }
  });
};

const syncDirectories = async (sourceDir, targetDir) => {
  const sourceFiles = await fsAsync.readdir(sourceDir);

  for (const fileName of sourceFiles) {
    const sourcePath = path.join(sourceDir, fileName);
    const targetPath = path.join(targetDir, fileName);

    const stat = await fsAsync.stat(sourcePath);

    if (stat.isFile()) {
      await copyFile(sourcePath, targetPath);
    } else if (stat.isDirectory()) {
      await fsAsync.mkdir(targetPath, { recursive: true });
      await syncDirectories(sourcePath, targetPath);
    }
  }
};

const start = async () => {
  const sourceDir = path.join(__dirname, 'source');
  const targetDir = path.join(__dirname, 'target');

  await syncDirectories(sourceDir, targetDir);
};

module.exports = {
  start,
};
