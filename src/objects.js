// @TODO replace with actual methods
// as we did it at other files
import { basename, parse, extname } from 'path';
import { fixPath, readAllFiles } from './utils';
import { readData } from './fileSystem';
import { updateContent } from './writeFile';
import { write, save, makeFolder } from './fileSystem'

/**
 * For combine()
 * @param {String} path Path of folder where all splitted files are stored
 * @param {var} keys List of keys that are to be removed
 */
function combine(path, keys) {
  const suffix = '_combined.json';
  path = fixPath(path);

  // read all json files
  // @TODO if we change our import we can call readAllFiles()
  let content = readAllFiles(path);
  // modifying structure
  content = updateContent(content, keys);
  // for example: elements_combined.json
  const fileNamePath = path + basename(path) + suffix;
  // saving
  write(fileNamePath, content);
}


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
  let path = parse(fullPath).dir;

  if (extname(file) !== '.json') {
    console.log('Require .json file.');
    return;
  }

  path = fixPath(path);

  // Reading data...
  const absolutePath = path+file;
  const fileData = readData(absolutePath);
  // new folder to save splitted files
  const folderNamePath = makeFolder(path, file);
  // saving files
  save(folderNamePath, file, fileData, flag);

  if (callback instanceof Function) {
    setTimeout(() => {
      callback(folderNamePath, keys);
    }, 1000);
  }
}

export  {
  combine,
  split,
};
