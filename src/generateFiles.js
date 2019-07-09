import mkdirSync from 'fs';
import { write } from './writeFile';
import { isDirectory } from './utils';
import config from './configGenerator';
import { setupPath } from './generateArray';
import { setupPathMeasurements } from './measurements';

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
const generateFiles = (pathToSrc) => {
  let path;
  setupPath(pathToSrc);
  setupPathMeasurements(pathToSrc);

  config.map((settings) => {
    const { fileName, data } = settings;
    if (fileName !== undefined && data !== undefined){
      const uppercaseFileName = fileName.charAt(0).toUpperCase();

      const folder = uppercaseFileName.concat(fileName.slice(1));
    //   var path = './output/' + fileName + '.json';
      const folderPath = `${pathToSrc}/data/${folder}`;

      if (isDirectory(folderPath)) {
        mkdirSync(folderPath);
      }

      path = `${folderPath}/${fileName}.json`;

      write(path, data());
    }else {
      console.error("Error generateFiles: fileName or data is undefined!");
    }
    
  });
};

export default generateFiles
