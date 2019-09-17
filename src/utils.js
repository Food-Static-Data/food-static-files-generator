/* eslint-disable no-console */

import pathExists from 'path-exists';
import uuidv1 from 'uuid/v1';
import dayjs from 'dayjs';
import _ from 'lodash';
import path, { resolve } from 'path';
import isValid from 'is-valid-path';
import { read, dirSync, syncStats } from './fileSystem';

const checkFilePath = async (filePath) => {
  if (!isValid(filePath)) {
    console.log('path is not valid');
    return;
  }
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
  if (!isValid(filePath)) {
    console.log('path is not valid');
    return;
  }
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
  if (!isValid(filePath)) {
    console.log('path is not valid');
    return;
  }
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
  if (!isValid(filePath)) {
    console.log('path is not valid');
    return;
  }
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
  if (!isValid(filePath)) {
    console.log('path is not valid');
    return;
  }
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
  if (!isValid(filePath)) {
    console.log('path is not valid');
    return;
  }
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
  if (!isValid(pathToSrc)) {
    console.log('path is not valid');
    return;
  }
  console.log('This is path TO Src');
  const fullPathToSrc = path.join(__dirname, pathToSrc);
  console.log(fullPathToSrc);
  const fullPathToSrcFiles = `${fullPathToSrc}/files`;
  const files = require(fullPathToSrcFiles);

  return files;
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
};
