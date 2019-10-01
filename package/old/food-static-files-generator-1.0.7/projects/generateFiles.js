import { mkdirSync } from "fs";
import { write, isFolderExists } from "./fileSystem";
// import { isDirectory } from "./utils";
// @TODO Hmm, I'm updating line below, but don't feel well about it.

// import config from '../projects3.0/config';

// import { setupPath } from './generateArray';
// import { setupPathMeasurements } from './measurements';

const pathPreparation = fileName => {
  const uppercaseFileName = fileName.charAt(0).toUpperCase();

  const folder = uppercaseFileName.concat(fileName.slice(1));
  //   var path = './output/' + fileName + '.json';
  const folderPath = `${pathToSrc}/data/${folder}`;

  if (isFolderExists(folderPath)) {
    mkdirSync(folderPath);
  }

  let path = `${folderPath}/${fileName}.json`;
  return path;
};

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
const generateFiles = (pathToSrc, config) => {
  let path;
  // const files = setupPath(pathToSrc);
  // setupPathMeasurements(pathToSrc);

  config.map(settings => {
    const { fileName, data } = settings;

    let path = pathPreparation(fileName);

    // const uppercaseFileName = fileName.charAt(0).toUpperCase();
    //
    // const folder = uppercaseFileName.concat(fileName.slice(1));
    // //   var path = './output/' + fileName + '.json';
    // const folderPath = `${pathToSrc}/data/${folder}`;
    //
    // if (isFolderExists(folderPath)) {
    //   mkdirSync(folderPath);
    // }
    //
    // path = `${folderPath}/${fileName}.json`;

    write(path, data());
    return 0;
  });
};

export default generateFiles;
