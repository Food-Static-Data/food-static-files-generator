import mkdirSync from 'fs';
import { write, readData } from './writeFile';
// var {
//   usersGrocery,
//   favorites,
//   getMenuGenerator,
//   items,
//   getMeasurementSystem,
//   getMeasurementUnits
// } = require('./generateArray')
import isDirectory from './utils';
import config from './configGenerator';
import setupPath from './generateArray';

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
const generateFiles = (pathToSrc) => {
  let path;
  setupPath(pathToSrc);

  config.map((settings) => {
    const { fileName, data } = settings;
    const uppercaseFileName = fileName.charAt(0).toUpperCase();

    const folder = uppercaseFileName.concat(fileName.slice(1));
    //   var path = './output/' + fileName + '.json';
    const folderPath = `${pathToSrc}/data/${folder}`;

    if (isDirectory(folderPath)) {
      mkdirSync(folderPath);
    }

    path = `${folderPath}/${fileName}.json`;

    write(path, data());
  });
};

export default {
  generateFiles,
};
