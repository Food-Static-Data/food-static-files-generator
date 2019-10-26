const { write } = require("@groceristar/static-data-generator");
// const { getMenuGenerator } = require("./methods");
const { getMenuGenerator } = require("@groceristar/data-methods-weeklymenu");

// right now it is used only for getMenuGenerator, but I think it is wrong.
// and we need to regenerate all files from scratch each time. especially if
// we are creating a new file or making changes at
// @TODO big issue
const generateFile = async(numberOfWeeks) => {
  const fileName = "generatedMenu";
  // 1. i don't like this paths. at least we can move first part outside - aka output...
  // 2. should we test this path with methods from generator aka isPathExists or something similar
  const path = `./output/${fileName}.json`;

  // @TODO right now we're using only one method from our list.
  // so it works only for one case.
  // we should pass a function aka callback as attribute to this method and call it here.
  const data = getMenuGenerator(numberOfWeeks);

  // @TODO should be pass a callback here?
  await write(path, data);
};

module.exports = generateFile;
