const { write } = require("@groceristar/static-data-generator");
const methods = require("./methods");
const structures = require("./structures");

// const {
//   getMeasurementSystem,
//   getMeasurementUnits
// } = require("./methods");

//const {
//  favorites, 
//  usersGrocery, 
//  getItemCustomStructureObjectArray
//} = require("./structures");
// favorites();
// usersGrocery();
// getItemCustomStructureObjectArray();




// @TODO should we run a generator script for making a new files here?
// structures.favorites();



// 1. for running quick tests
//  write("./output/test.json", [{ name: "Test" }]);




// 2. just testing write method with more real data
// const generatedFilesPath = "./output/test.json";
// write(generatedFilesPath, favorites);
// write(generatedFilesPath, usersGrocery);
// write(generatedFilesPath, getItemCustomStructureObjectArray);



// 3. same as "using generateFile method here instead of previous versions just for testing how it works"
// const generateFile = require('./generateFile')
// generateFile();
