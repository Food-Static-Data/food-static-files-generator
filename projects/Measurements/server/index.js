// @TODO can we replace it with alias?

const { parse } = require("path");
const _ = "lodash";
const { getMeasurementSystem, getMeasurementUnits } = require("./methods");

const { write } = require("@groceristar/static-data-generator");

// 1. for running quick tests
//  write("./output/test.json", [{ name: "Test" }]);

// 2. just testing write method with more real data
const generatedFilesPath = "./output/test.json";
write(generatedFilesPath, getMeasurementSystem);
write(generatedFilesPath, getMeasurementUnits);


// 3. same to "using generateFile method here instead of previous versions just for testing how it works"
// const generateFile = require('./generateFile')
// generateFile();
