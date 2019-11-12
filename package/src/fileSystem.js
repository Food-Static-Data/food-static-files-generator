/* eslint-disable no-console */
// @TODO We get an idea to replace console.logs and console.errors with a tools
// that is better for logging and reporting
const _ = require('lodash'); //imports whole library of lodash (temporary)

import {
  writeFile,
  mkdirSync,
  lstatSync,
  rmdirSync,
  unlinkSync,
  existsSync,
  readdirSync,
  readFile,
  readdir,
} from 'fs';
import isValid from 'is-valid-path';

import {
  stripSymbols,
  getFileName,
  isFolderExists,
  fixPath,
  dirSync,
  syncStats,
  getOnlyFiles,
} from './utils';

/**
 * Write in file
 * @param {String} path
 * @param {Object} data
 * @param {Function} callback
 */
// @TODO cover a test case, when dataStr is not an array.
// we can just pass a string there
const write = (path, data) => new Promise((resolve, reject) => {
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
      reject(err);
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
      // @TODO add else statement
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


  // lodash start of replacement for loop


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

  // end of replacement for loop


  // @TODO replace with lodash
  // for loop saved just in case we need it
//   for (let i = 0; i < fileDataLength && success; i += 1) {
//     // @TODO long line, I have feeling that it can be improved
//     // - we just need to find a better way to
//     // rewrite a getFileName method
//     const fileName = getFileName(file, fileData[i], flag, i);

//     const elementPath = `${folderNamePath}/${fileName}`;
//     const result = write(elementPath, fileData[i]);
//     if (!result) {
//       console.log(
//         `${fileName} is the filename, `
//           + `${elementPath} is the elementPath `
//           + 'and success is false',
//       );
//     }

//     success = success && result;
//   }

  return new Promise((resolve) => {
    resolve(success);
  });
};

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
 * @async
 * @param {dirPath} dirPath directory path
 * @returns {Promise<string[]>} Promise<srting[]>
 */
const readDir = (dirPath) => new Promise((resolve, reject) => {
  readdir(dirPath, (err, files) => {
    if (err) reject(err);
    resolve(files);
  });
});

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

/**
 * For deleteFolderRecursive()
 * @param {String} path
 */
const deleteFolderRecursive = (path) => {
  if (existsSync(path)) {
    readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`;
      if (lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  }
};

export {
  write,
  read,
  save,
  makeFolder,
  readAllFiles,
  getListContent,
  getFileInfo,
  deleteFolderRecursive,
  readDir,
};
