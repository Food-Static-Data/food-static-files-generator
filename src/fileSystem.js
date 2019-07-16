// here i want to keep methods like write, save
// we can also rename WriteFile to write
// saveFile to save - because we didn't save or wrtie anything else here
import { writeFile, mkdirSync, readFileSync } from 'fs';
import { stripSymbols, getFileName } from './writeFile';
import { isDirectory } from './utils';

/**
 * Write in file
 * @param {String} path
 * @param {Object} data
 * @param {Function} callback
 */
const write = (path, data, callback) => {
  const dataStr = stripSymbols(data);
  // dataStr = '[' + dataStr + ']'
  // console.log(dataStr)

  writeFile(path, dataStr, (err) => {
    if (err) {
      console.log(err);
      callback(false);
    }

    console.info(`${path} file generated successfully!`);
    callback(true);
  });
};

/**
 * readData()
 * @param {string} absolutePath
 *
 */
const readData = (absolutePath) => {
  console.log(absolutePath);

  const data = readFileSync(absolutePath);
  console.log(data);

  const fileData = JSON.parse(data);

  return fileData;
};

/**
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {Function} callback
 * */
// @TODO save got 5 attributes and most of them are about directory/files... 
// there should be another way
const save = (folderNamePath, file, fileData, flag, callback) => {
  const fileDataLength = fileData.length;
  for (let i = 0; i < fileDataLength; i++) {
    // @TODO long line, I have feeling that it can be improved
    // - we just need to find a better way to rewrite a getFileName method
    const fileName = getFileName(file, fileData[i], flag, i);
    const elementPath = `${folderNamePath}/${fileName}`;
    write(elementPath, fileData[i], status => {
      callback(status);
    });
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

export {
  write,
  readData,
  save,
  makeFolder
};
