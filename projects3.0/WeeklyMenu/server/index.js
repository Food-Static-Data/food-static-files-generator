const { write } = require("@groceristar/static-data-generator");

const { getMenuGenerator } = require("./methods");

// for running quick tests
//  write("./output/test.json", [{ name: "Test" }]);
const generatedFilesPath = "./output/test.json";
write(generatedFilesPath, getMenuGenerator);
