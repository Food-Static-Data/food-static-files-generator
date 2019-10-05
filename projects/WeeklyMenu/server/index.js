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
// const { getMenuGenerator } = require("./methods");
const generateFile = require("./generateFile");

mkdir("./output", (error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});

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

// 1. for running quick tests
write("./output/test.json", [{ name: "Test" }])
  .then(val => {
    console.log(val, "file written successfully");
    unlink("./output/test.json", (error, result) => {
      if (error) {
        return console.log(error, "Error in deleting test.json");
      }
      console.log("test.json File deleted");
    });
  })
  .catch(err => {
    console.log(err);
  });

// 2. just testing write method with more real data
const generatedFilesPath = "./output/test.json";
write(generatedFilesPath, getMenuGenerator(2))
  .then(val => {
    console.log(generatedFilesPath, "created successfully");
    console.log(getMenuGenerator(2));
  })
  .catch(error => {
    console.log(error);
  });

// 3. using generateFile method here instead of previous versions just for testing how it works
generateFile(2);
