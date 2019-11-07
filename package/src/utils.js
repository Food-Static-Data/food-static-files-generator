/* eslint-disable no-console */
import {
  mkdirSync, readdirSync, statSync, existsSync,
} from 'fs';
import { resolve, join } from 'path';
import pathExists from 'path-exists';
import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import dayjs from 'dayjs';

// @TODO what is the purpose of this method? Just separation?
// are we using them few times, right?
/**
 * @param {string} path
 *
 */
const dirSync = (filepath) => readdirSync(filepath);

// @TODO what is the purpose of this method?
/**
 * @param {string} path
 *
 */
const syncStats = (filepath) => statSync(filepath);

/**
 * isFolderExists prev. isDirectory()
 * @param {string} folderNamePath
 *
 */
const isFolderExists = (folderNamePath) => existsSync(folderNamePath);


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

const setupPath = (pathToSrc) => {
  console.log('This is path TO Src');
  const fullPathToSrc = join(__dirname, pathToSrc);
  console.log(fullPathToSrc);
  const fullPathToSrcFiles = `${fullPathToSrc}/files`;
  const files = require(fullPathToSrcFiles);

  return files;
};

const pathPreparation = (fileName) => {
  const pathToSrc = '';
  const uppercaseFileName = fileName.charAt(0).toUpperCase();

  const folder = uppercaseFileName.concat(fileName.slice(1));
  //   var path = './output/' + fileName + '.json';
  const folderPath = `${pathToSrc}/data/${folder}`;

  if (isFolderExists(folderPath)) {
    mkdirSync(folderPath);
  }

  const updatedPath = `${folderPath}/${fileName}.json`;
  return updatedPath;
};

export {
  checkFilePath,
  // readAllFiles,
  fixPath,
  getOnlyFiles,
  // getFileInfo,
  // getListContent,
  generateID,
  generateDate,
  generateArrWithId,
  setupPath,
  getFileKey,
  updateContent,
  stripSymbols,
  getFileName,
  fixFileName,
  pathPreparation,
  isFolderExists,
  dirSync,
  syncStats,
};
