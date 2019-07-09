import write from './writeFile';

import getMenuGenerator from './generateArray';

// right now it's used only for getMenuGenerator i think it wrong.
// and we need to regenerate all files from scratch each time. especially if we re creating a new files or make cnahnges at
// @TODO big issue
const generateFile = () => {
  const fileName = 'generatedMenu';
  const path = `./output/${fileName}.json`; // i don't like this paths. at least we can move first part outside - aka output...

  // @TODO right now we're using only one method from our list.
  // so it works only for one case.
  // we should pass a function aka callback as attribute to this method and call it here.
  const data = getMenuGenerator(2);

  write(path, data);
};

export {
  generateFile,
};
