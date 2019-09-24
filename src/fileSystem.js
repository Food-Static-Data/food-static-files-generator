/* eslint-disable no-console */
// @TODO We get an idea to replace console.logs and console.errors with a tools
// that is better for logging and reporting
import {
  writeFile,
  mkdirSync,
  existsSync,
  readdirSync,
  statSync,
  readFile,
} from 'fs';
import isValid from 'is-valid-path';

/**
 * fixFileName()
 * @param {string} fileName
 */
const fixFileName = (fileName) => {
  let correctedFileName;

  correctedFileName = fileName.replace(/ /g, '_'); // Replace space with underscore
  correctedFileName = fileName.toLowerCase(); // Maintain Uniformity

  return correctedFileName;
};

/**
 * for stripSymbols()
 * @param {Object} data a json object
 *
 */
const stripSymbols = (data) => {
  let dataStr = JSON.stringify(data);

  const replaceList = [
    ['/{"/g', '{ "'],
    ['/{"/g', '{ " '],
    ['/},{/g', ' },\n{'],
    ['/":/g', '": '],
    ['/,"/g', ',\n "'],
  ];

  replaceList.forEach((replacer) => {
    dataStr = dataStr.replace(replacer[0], replacer[1]);
  });

  return dataStr;
};

/**
 * getFileName()
 * @param {string} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {var} index
 */
// @TODO if we use fileData.name - why we didn't just pass it here?
const getFileName = (file, fileData, flag, index) => {
  let fileName;
  if (flag === 1) {
    // for example: 23-someJsonFile.json
    fileName = `${index}-${file}`;
  } else {
    // for example: someValueOfName.json
    fileName = `${fileData.name}.json`;
  }

  fileName = fixFileName(fileName);
  return fileName;
};

/**
 * Write in file
 * @param {String} path
 * @param {Object} data
 * @param {Function} callback
 */
// @TODO cover a test case, when dataStr is not an array.
// we can just pass a string there
const write = (path, data) => new Promise((resolve) => {
  if (!isValid(path)) {
    console.log('path is not valid');
  }

  let dataStr;

  if (typeof data === 'string') {
    dataStr = data;
  } else {
    dataStr = stripSymbols(data);
  }

  writeFile(path, dataStr, (err) => {
    if (!err) {
      console.info(`${path} file generated successfully!`);
      resolve(true);
    } else {
      console.error(err);
      resolve(false);
    }
  });
});

/**
 * read()
 * @param {string} absolutePath
 *
 */
const read = (absolutePath) => new Promise((resolve, reject) => {
  console.log(absolutePath);
  if (!isValid(absolutePath)) {
    console.log('path is invalid');
  }
  let dataStr;
  readFile(absolutePath, 'utf8', (err, data) => {
    if (!err) {
      if (data === '') {
        console.log(`${absolutePath} returned empty`);
      }
      dataStr = JSON.parse(data);
      console.log(dataStr);
      resolve(dataStr);
    } else {
      console.log(err);
      reject(err);
    }
  });
});

/**
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {Function} callback
 * */
// @TODO save got 4 attributes and most of them are about directory/files...
// there should be another way
const save = (folderNamePath, file, fileData, flag) => {
  if (!isValid(folderNamePath)) {
    console.log('path is not valid');
  }
  const fileDataLength = fileData.length;
  let success = true;

  // @TODO replace with lodash
  for (let i = 0; i < fileDataLength && success; i += 1) {
    // @TODO long line, I have feeling that it can be improved
    // - we just need to find a better way to
    // rewrite a getFileName method
    const fileName = getFileName(file, fileData[i], flag, i);

    const elementPath = `${folderNamePath}/${fileName}`;
    const result = write(elementPath, fileData[i]);
    if (!result) {
      console.log(
        `${fileName} is the filename, `
          + `${elementPath} is the elementPath `
          + 'and success is false',
      );
    }

    success = success && result;
  }

  return new Promise((resolve) => {
    resolve(success);
  });
};

/**
 * isFolderExists prev. isDirectory()
 * @param {string} folderNamePath
 *
 */
const isFolderExists = (folderNamePath) => existsSync(folderNamePath);

/**
 * @param {string} path
 *
 */
const dirSync = (filepath) => readdirSync(filepath);

/**
 * @param {string} path
 *
 */
const syncStats = (filepath) => statSync(filepath);

/**
 * @param {String} path
 * @param {String} file
 */
const makeFolder = (path, file) => {
  if (!isValid(path)) {
    console.log('path is not valid');
  }
  const suffix = '_elements';
  const folderName = file.slice(0, -5) + suffix;
  const folderNamePath = path + folderName;

  if (!isFolderExists(folderNamePath)) {
    mkdirSync(folderNamePath);
  }
  return folderNamePath;
};

export {
  write,
  read,
  save,
  makeFolder,
  isFolderExists,
  dirSync,
  syncStats,
  stripSymbols,
  getFileName,
  fixFileName,
};
