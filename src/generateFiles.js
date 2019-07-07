const fs = require('fs');
const { writeFile, readData } = require('./writeFile');
// var {
//   usersGrocery,
//   favorites,
//   getMenuGenerator,
//   items,
//   getMeasurementSystem,
//   getMeasurementUnits
// } = require('./generateArray')
const { isDirectory } = require('./utils');
const { config } = require('./configGenerator');
const { setupPath } = require('./generateArray');

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
function generateFiles(pathToSrc) {

    var path, data;
    setupPath(pathToSrc);

    config.map((settings) => {
      let fileName = settings.name;
      let uppercaseFileName = fileName.charAt(0).toUpperCase();

      let folder = uppercaseFileName.concat(fileName.slice(1));
      //   var path = './output/' + fileName + '.json';
      let folderPath = `${pathToSrc}/data/${folder}`;

      if (isDirectory(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      path = `${folderPath}/${fileName}.json`;
      data = settings.data;

      writeFile(path, data);
    });
}

module.exports = {
  generateFiles,
};
