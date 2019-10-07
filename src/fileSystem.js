// jshint esversion: 6
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
import { stripSymbols, getFileName } from './writeFile';
import _ from 'lodash'; //imports whole library of lodash (temporary)

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
    if (err) {
      console.error(err);
      resolve(false);
    } else {
      console.info(`${path} file generated successfully!`);
      resolve(true);
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

 // lodash start of replacement for loop

 

 // end of replacement for loop

// @TODO save got 4 attributes and most of them are about directory/files...
// there should be another way
const save = (folderNamePath, file, fileData, flag) => {
  if (!isValid(folderNamePath)) {
    console.log('path is not valid');
  }
  const fileDataLength = fileData.length;
  let success = true;

  // proposed start of replacement of for loop
  var array = _.range(0, fileDataLength, 1);
  _.forEach(array, function (file, fileName, flag, elementPath, fileData) {
    fileName = (file, fileData, flag);
    elementPath = `${folderNamePath}/${fileName}`;
    const result = write(elementPath, fileData);
 
    if (!result) {
      console.log(
        `${fileName} is the filename, ` + `${elementPath} is the elementPath ` + 'and success is false'
      );
    }
 
    success = success && result;
  });
  // up to here

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
  write, read, save, makeFolder, isFolderExists, dirSync, syncStats,
};
