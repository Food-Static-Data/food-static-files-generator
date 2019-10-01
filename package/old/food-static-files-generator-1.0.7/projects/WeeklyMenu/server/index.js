const { write } = require("@groceristar/static-data-generator");

const { getMenuGenerator } = require("./methods");

// 1. for running quick tests
//  write("./output/test.json", [{ name: "Test" }]);

// 2. just testing write method with more real data
const generatedFilesPath = "./output/test.json";
write(generatedFilesPath, getMenuGenerator);


// 3. using generateFile method here instead of previous versions just for testing how it works
// const generateFile = require('./generateFile')
// generateFile();
