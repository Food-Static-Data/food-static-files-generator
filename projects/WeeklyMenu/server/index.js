const {
  existsSync,
  readdirSync,
  lstatSync,
  unlinkSync,
  unlink,
  mkdir
} = require("fs");
const { write } = require("@groceristar/static-data-generator");
const { getMenuGenerator } = require("@groceristar/data-methods-weeklymenu");
const { createOutputFolder } = require("./methods");
const generateFile = require("./generateFile");

const deleteFolderRecursive = path => {
  if (existsSync(path)) {
    readdirSync(path).forEach((file, index) => {
      let curPath = path + "/" + file;
      if (lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  }
};

// 3. using generateFile method here instead of previous versions just for testing how it works
const generateMenuData = async(numberOfWeeks) => {
  await createOutputFolder();
  await generateFile(numberOfWeeks);
};

generateMenuData(2);
