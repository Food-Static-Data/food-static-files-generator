// @TODO update require. when we export this method - we can connect it from index.js
const {
  parseDirectoryFiles,
  getHeaders
} = require('../../dist/index.cjs');


async function Main() {
  const headers = await getHeaders('./raw/Food_Composition.csv');
  // const headers = await getHeaders('./raw/Food_Composition-Italy.csv');
  const directory = './';

  const directoryPath = path.join(__dirname, directory);

  parseDirectoryFiles(directoryPath, headers);


}
Main();
