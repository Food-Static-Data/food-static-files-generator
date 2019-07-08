// @TODO here we'll store all necessary methods that we can use at different places.

// i think we should have here methods like
// __generateId
// __generateId
// getFileKey - i don't like the name

import pathExists from 'path-exists';
import uuidv1 from 'uuid/v1';
import dayjs from 'dayjs';
import fs from 'fs';
import PATH from 'path';

const checkFilePath = async (path) => {
  if (await pathExists(path)) {
    console.log(`Filepath ${path} exist`);
  } else {
    console.log(`Filepath ${path} doesn\`t exist`);
  }
};

/* global describe, it, expect */

/**
 * isDirectory()
 * @param {string} folderNamePath
 *  */
const isDirectory = folderNamePath => {
  if (fs.existsSync(folderNamePath)) {
      return false;
  }
  return true;
}

/**
 * For readAllFiles()
 * @param {String} path
 */
const readAllFiles = path => {
  const content = [];
  path = fixPath(path);
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const fileStat = fs.statSync(path + file).isDirectory();
    if (file.slice(-5) === '.json') {
      if (!fileStat) {
        let data = fs.readFileSync(path + file);
        data = JSON.parse(data);
        content.push(data);
      }
    }
  });
  return content;
}

/**
 * For getListContent()
 * @param {String} path
 * @param {String} fileName
 */
const getListContent = (path, fileName = 'undefined') => {
  if (fileName === 'undefined') {
    // read all files
    return readAllFiles(path);
  }
  // read specified file
  let data = fs.readFileSync(path + fileName);
  data = JSON.parse(data);
  return data;
};

/**
 * fixPath()
 * @param {String} path
 */
const fixPath = path => {
  path = PATH.resolve(__dirname, path);
  if (path.charAt(path.length - 1) !== '/') path += '/';
  return path;
};

/**
 * For getList()
 * @param {String} path
 */
 // @TODO get list of what? maybe we can name it better? as not a developer of this code - it looks confusing for me
const getList = path => {
  const list = [];
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const fileStat = fs.statSync(path + file).isDirectory();
    if (!fileStat) {
      list.push(file);
    }
  });
  return list;
}

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
  path = fixPath(path);
  if (flag === 1) {
    // get content from file
    return getListContent(path, fileName);
  }
  // return list of files
  return getList(path);
}

const __generateId = () => {
  return uuidv1()
}

const __generateDate = () => {
  return dayjs().toDate()
}

// @TODO
// 1. this function looks like a duplicate with getFileKey
// 2. it's pretty useful for other cases, so i think we should move it into utils and reuse
const generateArrWithId = (data, id) => {
  var result = []
  _.map(data, element => {
    result.push({
      ...element,
      [id]: utils.__generateId() // @TODO change import so we can use __generateId() only
    })
  })

  return result
};


// @TODO WTF tests are doing there? bad bad bad coder did it!
// test expecting json file not to be empty
const jsonFileNotEmptyTest = (file) => {
  describe(`tests for ${file}`, () => {
    it(`${file} data files returns array`, () => {
      expect(file).not.toBe('');
    });
  });
};

const jsonSchemaTest = (file, example, schema) => {
  describe(`test ${file} json schema`, () => {
    it(`validates ${file} json-schema`, () => {
      expect(example).toMatchSchema(schema);
    });
  });
};
// checkFilePath('./generator/utils1.js') using method checkFilePath

export default {
  checkFilePath,
  __generateId,
  __generateDate,
  generateArrWithId,
  
  jsonFileNotEmptyTest,
  jsonSchemaTest,

  getFileInfo,
  readAllFiles,
  isDirectory,
  fixPath
}
