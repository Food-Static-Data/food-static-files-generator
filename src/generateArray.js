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

const setupPath = (pathToSrc) => {
  const files = require(`${pathToSrc}/files`);

  return files;
};

export default {
  setupPath,
};
