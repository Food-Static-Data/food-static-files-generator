/* eslint-disable no-console */

import pathExists from "path-exists";
import uuidv1 from "uuid/v1";
import dayjs from "dayjs";
import fs from "fs";
import _ from "lodash";
import { path, resolve } from "path";

const checkFilePath = async filePath => {
  if (await pathExists(filePath)) {
    console.log(`Filepath ${filePath} exist`);
  } else {
    console.log(`Filepath ${filePath} doesn\`t exist`);
  }
};

/**
 * isDirectory()
 * @param {string} folderNamePath
 *  */
const isDirectory = folderNamePath => {
  if (fs.existsSync(folderNamePath)) {
    return false;
  }
  return true;
};

/**
 * fixPath()
 * @param {String} path
 */
const fixPath = filePath => {
  let newPath = resolve(__dirname, filePath);
  if (newPath.charAt(newPath.length - 1) !== "/") {
    newPath += "/";
  }
  return newPath;
};

/**
 * For readAllFiles()
 * @param {String} filePath
 */
const readAllFiles = filePath => {
  const content = [];
  const newPath = fixPath(filePath);
  const files = fs.readdirSync(newPath);
  files.forEach(file => {
    const fileStat = fs.statSync(newPath + file).isDirectory();
    if (file.slice(-5) === ".json") {
      if (!fileStat) {
        let data = fs.readFileSync(newPath + file);
        data = JSON.parse(data);
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
const getListContent = (filePath, fileName = "undefined") => {
  if (fileName === "undefined") {
    // read all files
    return readAllFiles(filePath);
  }
  // read specified file
  let data = fs.readFileSync(filePath + fileName);
  data = JSON.parse(data);
  return data;
};

/**
 * For getList()
 * @param {String} filePath
 */
// @TODO get list of what? maybe we can name it better? as not a
// developer of this code - it looks confusing for me
const getList = filePath => {
  const list = [];
  const files = fs.readdirSync(filePath);
  files.forEach(file => {
    const fileStat = fs.statSync(filePath + file).isDirectory();
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
const getFileInfo = (filePath, flag = 0, fileName = "undefined") => {
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
  return getList(pathCopy);
};

const generateID = () => uuidv1();

const generateDate = () => dayjs().toDate();

// @TODO
// 1. this function looks like a duplicate with getFileKey
// 2. it's pretty useful for other cases, so i think we should move it into utils and reuse
const generateArrWithId = (data, id) => {
  const result = [];
  _.map(data, element => {
    result.push({
      ...element,
      [id]: generateID()
    });
  });

  return result;
};

 const getFileKey = file => _.map(file, (item, index) => ({
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

const setupPath = pathToSrc => {
  console.log("This is path TO Src");
  const fullPathToSrc = path.join(__dirname, pathToSrc);
  console.log(fullPathToSrc);
  const files = require(`${fullPathToSrc}/files`);

  return files;
};

export {
  checkFilePath,
  isDirectory,
  readAllFiles,
  getListContent,
  fixPath,
  getList,
  getFileInfo,
  generateID,
  generateDate,
  generateArrWithId,
  setupPath,
  getFileKey
};
