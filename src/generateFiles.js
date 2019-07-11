import mkdirSync from 'fs';
import { write } from './fileSystem';
import { isDirectory } from './utils';
import config from './configGenerator';
import { setupPath } from './generateArray';
// import { setupPathMeasurements } from './measurements';

// console.log('generate file start');

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
const generateFiles = (pathToSrc) => {
  let path;
//   console.log('1');
  const files = setupPath(pathToSrc);
  // setupPathMeasurements(pathToSrc);
//   console.log('2');

  config.map((settings) => {
    const { fileName, data } = settings;
    // console.log('3');
      const uppercaseFileName = fileName.charAt(0).toUpperCase();

      const folder = uppercaseFileName.concat(fileName.slice(1));
    //   var path = './output/' + fileName + '.json';
      const folderPath = `${pathToSrc}/data/${folder}`;

      if (isDirectory(folderPath)) {
        mkdirSync(folderPath);
      }

      path = `${folderPath}/${fileName}.json`;
    //   console.log('4');
      write(path, data());
  });
};

export default generateFiles
