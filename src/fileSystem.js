import { writeFile, mkdirSync, readFileSync } from "fs";
import { stripSymbols, getFileName } from "./writeFile";
import { isDirectory } from "./utils";

/**
 * Write in file
 * @param {String} path
 * @param {Object} data
 * @param {Function} callback
 */
const write = (path, data) =>
  new Promise(resolve => {
    const dataStr = stripSymbols(data);
    // dataStr = '[' + dataStr + ']'
    // console.log(dataStr)

    writeFile(path, dataStr, err => {
      if (err) {
        console.log(err);
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
const read = absolutePath => {
  console.log(absolutePath);

  // @TODO cover this case - absolutePath
  // return file but it's empty. We need an if here
  const data = readFileSync(absolutePath);
  if (data === "") {
    console.log(`${absolutePath} returned empty`);
  }
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
const save = (folderNamePath, file, fileData, flag) => {
  const fileDataLength = fileData.length;
  let success = true;

  // @TODO replace with lodash
  for (let i = 0; i < fileDataLength && success; i += 1) {
    // @TODO long line, I have feeling that it can be improved
    // - we just need to find a better way to
    // rewrite a getFileName method
    const fileName = getFileName(file, fileData[i], flag, i);

    const elementPath = `${folderNamePath}/${fileName}`;
    const result = write(elementPath, fileData[i]);
    if (!result) {
      console.log(
        `${fileName} is the filename, ${elementPath} is the elementPath and success is false`
      );
    }

    success = success && result;
  }

  return new Promise(resolve => {
    resolve(success);
  });
};

/**
 * @param {String} path
 * @param {String} file
 */
const makeFolder = (path, file) => {
  const suffix = "_elements";
  const folderName = file.slice(0, -5) + suffix;
  const folderNamePath = path + folderName;
  // @TODO if we update our import
  // we'll be able to use just isDirectory()
  if (isDirectory(folderNamePath)) {
    mkdirSync(folderNamePath);
  }
  return folderNamePath;
};

export { write, read, save, makeFolder };
