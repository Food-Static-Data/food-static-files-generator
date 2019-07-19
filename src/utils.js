import pathExists from 'path-exists';
import uuidv1 from 'uuid/v1';
import dayjs from 'dayjs';
import fs from 'fs';
import _ from 'lodash';
import { resolve } from 'path';

const checkFilePath = async (path) => {
  if (await pathExists(path)) {
    console.log(`Filepath ${path} exist`);
  } else {
    console.log(`Filepath ${path} doesn\`t exist`);
  }
};

/**
 * fixPath()
 * @param {String} path
 */
const fixPath = (path) => {
  let newPath = resolve(__dirname, path);
  if (newPath.charAt(newPath.length - 1) !== '/') {
    newPath += '/';
  }
  return newPath;
};

/**
 * isADirectory()
 * @param {string} folderNamePath
 *  */
const isADirectory = (folderNamePath) => {
  const newPath = fixPath(folderNamePath);
  console.log(newPath);
  if (fs.existsSync(newPath)) {
    return false;
  }
  return true;
};


/**
 * For readAllFiles()
 * @param {String} path
 */
const readAllFiles = (path) => {
  const content = [];
  const newPath = fixPath(path);
  const files = fs.readdirSync(newPath);
  files.forEach((file) => {
    const fileStat = fs.statSync(newPath + file).isADirectory();
    if (file.slice(-5) === '.json') {
      if (!fileStat) {
        let data = fs.readData(newPath + file);
        data = JSON.parse(data);
        content.push(data);
      }
    }
  });
  return content;
};

/**
 * For getListContent()
 * @param {String} path
 * @param {String} fileName
 */
const getListContent = (path, fileName = 'undefined') => {
  if (fileName === 'undefined') {
    // read all files
    return readAllFiles(fixPath(path));
  }
  // read specified file
  let data = fs.readData(fixPath(path) + fileName);
  data = JSON.parse(data);
  return data;
};

/**
 * For getList()
 * @param {String} path
 */
// @TODO get list of what? maybe we can name it better? as not a
// developer of this code - it looks confusing for me
const getList = (path) => {
  const list = [];
  const newPath = fixPath(path);
  const files = fs.readdirSync(newPath);
  files.forEach((file) => {
    // @TODO I don't like this long line. and isADirectory are method from FS or our method?
    // if we have a method that have similar name to fs - we need to change our name, 
    // in order to reduce any possible bugs
    const fileStat = fs.statSync(newPath + file).isADirectory();
    if (!fileStat) {
      list.push(file);
    }
  });
  return list;
};

/**
 * For getFileInfo()
 * @param {String} path
 * @param {var} flag
 * @param {String} fileName
 */
const getFileInfo = (path, flag = 0, fileName = 'undefined') => {
  /*
      flag = 1 --> means return content
      if file name is given then content of that file else return content of all files.
      only path is given( flag=0 )--> give list of all files in directory.
    */
  const pathCopy = fixPath(path);
  if (flag === 1) {
    // get content from file
    return getListContent(pathCopy, fileName);
  }
  // return list of files
  return getList(pathCopy);
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

const getFileKey = file => _.map(file, (item, index) => ({
  key: generateID(),
  ...item,
}));

export {
  checkFilePath,
  isADirectory,
  readAllFiles,
  getListContent,
  fixPath,
  getList,
  getFileInfo,
  generateID,
  generateDate,
  generateArrWithId,
};
