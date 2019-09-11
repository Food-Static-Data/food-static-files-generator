// const { promisify } = require('util')

// @TODO move to utils.js
/**
 * for stripSymbols()
 * @param {Object} data a json object
 *
 */
const stripSymbols = (data) => {
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
 * fixFileName()
 * @param {string} fileName
 */
const fixFileName = (fileName) => {
  let correctedFileName;

  correctedFileName = fileName.replace(/ /g, '_'); // Replace space with underscore
  correctedFileName = fileName.toLowerCase(); // Maintain Uniformity

  return correctedFileName;
};

/**
 * getFileName()
 * @param {string} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {var} index
 */
// @TODO if we use fileData.name - why we didn't just pass it here?
const getFileName = (file, fileData, flag, index) => {
  let fileName;
  if (flag === 1) {
    // for example: 23-someJsonFile.json
    fileName = `${index}-${file}`;
  } else {
    // for example: someValueOfName.json
    fileName = `${fileData.name}.json`;
  }

  fileName = fixFileName(fileName);
  return fileName;
};

/**
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
const updateContent = (content, keys) => {
  const contentCopy = content;

  // @TODO error  Assignment to property of function parameter 'obj'
  // no - param - reassign;
  contentCopy.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key];
      });
    });
  });
  return contentCopy;
};

export { stripSymbols, getFileName, updateContent };
