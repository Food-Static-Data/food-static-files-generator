/ here i want to keep methods like write, save
// we can also rename WriteFile to write
// saveFile to save - because we didn't save or wrtie anything else here
import { writeFile, mkdirSync } from 'fs';
import { makeReadable, getFileName } from './writeFile'
import { isDirectory } from './utils';

/**
 * Write in file
 * @param {String} path
 * @param {Object} data
 */
const write = (path, data, callback) => {
  const dataStr = makeReadable(data);
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
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * */
const save = (folderNamePath, file, fileData, flag, callback) => {
  const fileDataLength = fileData.length;
  for (let i = 0; i < fileDataLength; i++) {
    const fileName = getFileName(file, fileData[i], flag, i);
    const elementPath = `${folderNamePath}/${fileName}`;
    write(elementPath, fileData[i], success => {
       if(!success) 
        callback(false);
    });
  }
  callback(true);
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
}

export {
  write,
  save,
  makeFolder
}