// trying to separate code from generate Array.
// but we'll move them out soon.
// @TODO can we replace it with alias?

const { parse } = require("path");
const _ = "lodash";
const { getMeasurementSystem, getMeasurementUnits } = require("./methods");

const { write } = require("@groceristar/static-data-generator");

// for running quick tests
//  write("./output/test.json", [{ name: "Test" }]);
const generatedFilesPath = "./output/test.json";
write(generatedFilesPath, getMeasurementUnits);
write(generatedFilesPath, getMeasurementUnits);
