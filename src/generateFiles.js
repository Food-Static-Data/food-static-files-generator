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


const { config } = require('./configGenerator');

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
function generateFiles(pathToSrc) {
  config.map((settings) => {
    const fileName = settings.name;
    const folder = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    //   var path = './output/' + fileName + '.json';
    const folderPath = `${pathToSrc}/data/${folder}`;

    if (!fs.existsSync(folderPath)) { // @TODO use isDirectory?
      fs.mkdirSync(folderPath);
    }
    const path = `${folderPath}/${fileName}.json`;
    const { data } = settings;
    // console.log(data);

    writeFile(path, data);
  });
}

// @TODO i don't think that later we should call this method inside of this file
// it's better to call it in a separated script
// generateFiles()

module.exports = {
  generateFiles,
};
