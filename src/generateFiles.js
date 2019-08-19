import { mkdirSync } from "fs";
import { write } from "./fileSystem";
import { isDirectory } from "./utils";
import config from "../projects/configGenerator";

// import { setupPath } from './generateArray';
// import { setupPathMeasurements } from './measurements';

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
const generateFiles = pathToSrc => {
  let path;
  // const files = setupPath(pathToSrc);
  // setupPathMeasurements(pathToSrc);

  config.map(settings => {
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
    return 0;
  });
};

export default generateFiles;
