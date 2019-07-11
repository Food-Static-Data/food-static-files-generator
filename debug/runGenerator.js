const  { generateFiles } = require('../dist/index.cjs')

const path = require('path')
// module sd and food-static-files-generator should be in one folder
// js
// |- sd
// |- food-static-files-generator
const path1 = path.join(__dirname, '../../sd/src') 
console.log("--------------------------------");
console.log("----You are in Debug mode----");


console.log("Path to module sd: " +  path1);
generateFiles(path1)