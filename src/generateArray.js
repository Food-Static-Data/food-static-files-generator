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
import path from "path";

const setupPath = pathToSrc => {
  console.log("This is path TO Src");
  const fullPathToSrc = path.join(__dirname, pathToSrc);
  console.log(fullPathToSrc);
  const files = require(`${fullPathToSrc}/files`);

  return files;
};

export default setupPath;
