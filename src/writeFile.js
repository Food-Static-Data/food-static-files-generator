// const filePath = require('../files')

import { writeFile, readFileSync, mkdirSync } from 'fs';

// import * as PATH from 'path'
import { isDirectory } from './utils';

// const { promisify } = require('util')
// const _ = require('lodash')

// @TODO i don't like this function name
/**
 * for makeReadable()
 * @param {Object} data a json object
 * */
const makeReadable = (data) => {
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
 * Write in file
 * @param {String} path
 * @param {Object} data
 */
const write = (path, data) => {
  const dataStr = makeReadable(data);
  // dataStr = '[' + dataStr + ']'
  // console.log(dataStr)

  writeFile(path, dataStr, (err) => {
    if (err) {
      return console.log(err);
    }

    console.info(`${path} file generated successfully!`);
  });
};

/**
 * readData()
 * @param {string} path
 * @param {string} file
 * */
// @TODO if inside at this function we use path+file, maybe it's better to pass one variable?
const readData = (path, file) => {
  console.log(path + file);

  const data = readFileSync(path + file);
  console.log(data);

  const fileData = JSON.parse(data);
  return fileData;
};

/**
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * */
const saveFile = (folderNamePath, file, fileData, flag) => {
  const fileDataLength = fileData.length;
  for (let i = 0; i < fileDataLength; i++) {
    const fileName = getFileName(file, fileData[i], flag, i);
    const elementPath = `${folderNamePath}/${fileName}`;
    write(elementPath, fileData[i]);
  }
};

/**
 * @param {String} path
 * @param {String} file
 */
const makeFolder = (path, file) => {
  const suffix = '_elements';
  const folderName = file.slice(0, -5) + suffix;
  const folderNamePath = path + folderName;
  // @TODO if we update our import - we'll be able to use just isDirectory()
  if (isDirectory(folderNamePath)) {
    mkdirSync(folderNamePath);
  }
  return folderNamePath;
};
// execute function
// splitObject()

/**
 * fixFileName()
 * @param {string} fileName
 */
const fixFileName = (fileName) => {
  fileName = fileName.replace(/ /g, '_'); // Replace space with underscore
  fileName = fileName.toLowerCase(); // Maintain Uniformity
  return fileName;
};

/**
 * getFileName()
 * @param {string} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {var} index
 */
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
  content.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key];
      });
    });
  });
  return content;
};


export {
  write,
  updateContent,
  makeReadable,
  readData,
  makeFolder,
  saveFile
};
