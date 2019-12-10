/* eslint-disable no-console */

import { basename, parse, extname } from 'path';
import { fixPath, updateContent, isPathValid } from './utils';

import {
  read, write, save, makeFolder, readAllFiles,
} from './fileSystem';

/**
 * For combine()
 * @param {String} path Path of folder where all splitted files are stored
 * @param {var} keys List of keys that are to be removed
 */
const combine = (path, keys) => new Promise((resolve) => {
  const suffix = '_combined.json';
  isPathValid(path);
  const updatedPath = fixPath(path);

  // read all json files
  // @TODO if we change our import we can call readAllFiles()
  // @TODO as we removed isDirectory method at prev releases - this method will break.
  let content = readAllFiles(updatedPath);
  // modifying structure
  content = updateContent(content, keys);
  // for example: elements_combined.json
  // @TODO long line...
  const fileNamePath = updatedPath + basename(updatedPath) + suffix;
  // saving
  write(fileNamePath, content);

  resolve();
});

// @TODO update with promise instead of callbacks
/**
 * For split
 *
 * @describe split large files into single elements
 *
 * @param {String} fullPath
 * @param {var} flag
 * @param {var} keys
 * @param {var} callback
 */
function split(fullPath, flag = 1, keys = [], callback) {
  /*
       flag=1 ==> name according to index
       flag=0 ==> name according to "name" attribute
     */
  const file = basename(fullPath);
  isPathValid(fullPath);
  const path = parse(fullPath).dir;

  if (extname(file) !== '.json') {
    console.log('Require .json file.');
    return;
  }

  const updatedPath = fixPath(path);

  // Reading data...
  const absolutePath = updatedPath + file;
  const fileData = read(absolutePath);
  // new folder to save splitted files
  const folderNamePath = makeFolder(updatedPath, file);
  // saving files
  save(folderNamePath, file, fileData, flag);

  if (callback instanceof Function) {
    setTimeout(() => {
      callback(folderNamePath, keys);
    }, 1000);
  }
}

export { combine, split };
