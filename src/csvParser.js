const path = require('path');
const fs = require('fs');
const filesystem = require('fs');
const csv = require('csv-parser');
const writeInFile = require('./writeFile');


const maxEntries = 10000;
let result = [];
let folderName; let
  numberOfFiles;

const fileWriter = (i, fileName, start, stop) => {
  const data = result.slice(start, stop);
  writeInFile.writeFile(path.join(__dirname, `/projects/USFA/${folderName}/${fileName}${i}.json`), data);
};

const splitJsonIntoFiles = (fileName) => {
  let i = 1;

  for (i; i <= numberOfFiles; i++) {
    const start = (i - 1) * maxEntries;
    let stop = i * maxEntries;

    if (i === numberOfFiles) {
      stop = result.length + 1;
      fileWriter(i, fileName, start, stop);
      return;
    }

    fileWriter(i, fileName, start, stop);
  }
};

const csvToJson = (directory, file, headers) => {
  const fileName = file.split('.')[0];

  const folder = directory.split('/');

  folderName = folder[folder.length - 1];

  const results = [];

  // @TODO it's a very long path. we can use our aliases
  // in order to make it shorter. check readme https://github.com/GroceriStar/sd/tree/master/docs#babel-alias
  fs.createReadStream(
    path.resolve(__dirname, `${directory}/${file}`),
  )
    .pipe(
      csv({
        skipLines: 1,
        headers,
      }),
    )
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      numberOfFiles = Math.ceil(results.length / maxEntries);
      result = results;
      splitJsonIntoFiles(fileName);
    });
};

const parseDirectoryFiles = (directoryPath, headers) => {
  // passing directoryPath and callback function
  filesystem.readdir(directoryPath, (err, files) => {
  // handling error
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }
    // listing all files using forEach
    files.forEach((file) => {
    // Do whatever you want to do with the file
      console.log(file, typeof file);
      if (file.split('.')[1] === 'csv') {
        csvToJson(directoryPath, file, headers);
      }
    });
  });
};

module.exports = {
  parseDirectoryFiles,
};
