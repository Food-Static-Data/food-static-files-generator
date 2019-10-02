/* eslint-disable */

const path = require("path");

// @TODO should not work at this moment.
// I'm making some changes so it will break
const { generateFiles } = require("../dist/index.cjs");

// module sd and food-static-files-generator should be in one folder
// js
// |- sd
// |- food-static-files-generator
//// will not work correctly....
const staticDataDirectory = path.join(__dirname, "../../sd/src");
console.log("--------------------------------");
console.log("----You are in Debug mode----");

console.log(`Path to module sd: ${staticDataDirectory}`);

generateFiles(staticDataDirectory);
