// @TODO update it later. right now i care about speed
const methods = require("./methods");
const structures = require("./structures");

// @TODO should we run a generator script for making a new files here?

// structures.favorites();

// const { write } = require("../dist/index.cjs");

// write("./output/test.json", [{ name: "Test" }]);

// module.exports = {
//   methods,
//   structures
// };

// const {
//   getMeasurementSystem,
//   getMeasurementUnits
// } = require("./methods");
//

const { write } = require("@groceristar/static-data-generator");

// for running quick tests
//  write("./output/test.json", [{ name: "Test" }]);
const generatedFilesPath = "./output/test.json";
write(generatedFilesPath, getMeasurementUnits);
write(generatedFilesPath, getMeasurementUnits);
