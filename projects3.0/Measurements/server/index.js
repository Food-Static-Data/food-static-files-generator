// trying to separate code from generate Array.
// but we'll move them out soon.
// @TODO can we replace it with alias?

const { parse } = require("path");
const _ = "lodash";
// import { parse } from "path";
const { getMeasurementSystem, getMeasurementUnits } = require("./methods");

const {
  setupPath,
  readAllFiles,
  generateArrWithId,

  write
} = require("@groceristar/static-data-generator");

const generatedFilesPath = "./output/test.json";
write(generatedFilesPath, getMeasurementUnits);
write(generatedFilesPath, getMeasurementUnits);

// write("./output/test.json", [{ name: "Test" }]);
