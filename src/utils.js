/* eslint-disable no-console */

import pathExists from 'path-exists';
import uuidv1 from 'uuid/v1';
import dayjs from 'dayjs';
import _ from 'lodash';
import path, { resolve } from 'path';
import { readdirSync, statSync, readFile } from 'fs';
import isValid from 'is-valid-path';

/**
 * read()
 * @param {string} absolutePath
 *
 */
const read = (absolutePath) => new Promise((res, rej) => {
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
      res(dataStr);
    } else {
      console.log(err);
      rej(err);
    }
  });
});

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

const checkFilePath = async (filePath) => {
  if (await pathExists(filePath)) {
    console.log(`Filepath ${filePath} exist`);
  } else {
    console.log(`Filepath ${filePath} doesn\`t exist`);
  }
};

/**
 * fixPath()
 * @param {String} path
 */
const fixPath = (filePath) => {
  let newPath = resolve(__dirname, filePath);
  if (newPath.charAt(newPath.length - 1) !== '/') {
    newPath += '/';
  }
  return newPath;
};

/**
 * For readAllFiles()
 * @param {String} filePath
 */
// @TODO as we removed isDirectory - this method wouldn't work.
// let's figure out what to do.
// i think this method should work, used and moved into fileSystem.js
const readAllFiles = (filePath) => {
  const content = [];
  const newPath = fixPath(filePath);
  const files = dirSync(newPath);
  files.forEach((file) => {
    // @TODO this is a very long and confusing line
    const fileStat = syncStats(newPath + file).isDirectory();
    if (file.slice(-5) === '.json') {
      if (!fileStat) {
        const data = read(newPath + file);
        content.push(data);
      }
    }
  });
  return content;
};

/**
 * For getListContent()
 * @param {String} filePath
 * @param {String} fileName
 */
const getListContent = (filePath, fileName = 'undefined') => {
  if (fileName === 'undefined') {
    // read all files
    return readAllFiles(filePath);
  }
  // read specified file
  const data = read(filePath + fileName);
  return data;
};

/**
 * For getOnlyFiles()
 * @param {String} filePath
 */
// @TODO get list of what? maybe we can name it better? as not a
// developer of this code - it looks confusing for me
const getOnlyFiles = (filePath) => {
  const list = [];
  const files = dirSync(filePath);
  files.forEach((file) => {
    const fileStat = syncStats(`${filePath}/${file}`).isDirectory();
    if (!fileStat) {
      list.push(file);
    }
  });
  return list;
};

/**
 * For getFileInfo()
 * @param {String} filePath
 * @param {var} flag
 * @param {String} fileName
 */
const getFileInfo = (filePath, flag = 0, fileName = 'undefined') => {
  /*
      flag = 1 --> means return content
      if file name is given then content of that file else return content of all files.
      only path is given( flag=0 )--> give list of all files in directory.
    */
  const pathCopy = fixPath(filePath);
  if (flag === 1) {
    // get content from file
    return getListContent(pathCopy, fileName);
  }
  // return list of files
  return getOnlyFiles(pathCopy);
};

const generateID = () => uuidv1();

const generateDate = () => dayjs().toDate();

// @TODO
// 1. this function looks like a duplicate with getFileKey
// 2. it's pretty useful for other cases, so i think we should move it into utils and reuse
const generateArrWithId = (data, id) => {
  const result = [];
  _.map(data, (element) => {
    result.push({
      ...element,
      [id]: generateID(),
    });
  });

  return result;
};

const getFileKey = (file) => _.map(file, (item) => ({
  key: generateID(),
  ...item,
}));

// const {
//   users,
//   grocery,
//   ingredients,
//   measurementSystem,
//   measurementUnits
// } = require('@files')
// const { pathToSrc }  = require('./settings.json')
// console.log("path to src");

// console.log(pathToSrc);

// @TODO maybe in future it can be improved
// let files;

const setupPath = (pathToSrc) => {
  console.log('This is path TO Src');
  const fullPathToSrc = path.join(__dirname, pathToSrc);
  console.log(fullPathToSrc);
  const fullPathToSrcFiles = `${fullPathToSrc}/files`;
  const files = require(fullPathToSrcFiles);

  return files;
};

// Added writeFile.js functions
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
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
const updateContent = (content, keys) => {
  const contentCopy = content;

  // @TODO error  Assignment to property of function parameter 'obj'
  // no - param - reassign;
  contentCopy.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key];
      });
    });
  });
  return contentCopy;
};

export {
  checkFilePath,
  readAllFiles,
  fixPath,
  getOnlyFiles,
  getFileInfo,
  getListContent,
  generateID,
  generateDate,
  generateArrWithId,
  setupPath,
  getFileKey,
  stripSymbols,
  getFileName,
  fixFileName,
  updateContent,
};
