// const filePath = require('../files')

import { readFileSync } from 'fs';
import { write, save } from './fileSystem'
// import * as PATH from 'path'

// const { promisify } = require('util')
// const _ = require('lodash')

// @TODO i don't like this function name
/**
 * for makeReadable()
 * @param {Object} data a json object
 * */
const makeReadable = (data) => {
    let dataStr = JSON.stringify(data);

  const replaceList = [
    ['/{"/g', '{ "'],
    ['/{"/g', '{ " '],
    ['/},{/g', ' },\n{'],
    ['/":/g', '": '],
    ['/,"/g', ',\n "'],
  ];

  replaceList.forEach((replacer) => {
    dataStr = dataStr.replace(replacer[0], replacer[1]);
  });

  return dataStr;


};

/**
 * readData()
 * @param {string} path
 * @param {string} file
 * */
// @TODO if inside at this function we use path+file, maybe it's better to pass one variable?
const readData = (path, file) => {
  console.log(path + file);

  const data = readFileSync(path + file);
  console.log(data);

  const fileData = JSON.parse(data);
  return fileData;
};

// execute function
// splitObject()

/**
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
const updateContent = (content, keys) => {
  const contentCopy = content;

  contentCopy.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key];
      });
    });
  });
  return contentCopy;
};


export {
  write,
  updateContent,
  makeReadable,
  readData,
  save,
  getFileName
};
