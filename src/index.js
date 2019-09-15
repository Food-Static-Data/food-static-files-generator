// import generateFiles from './generateFiles';
// @TODO not sure if we need to export it
import { getFileInfo, getListContent } from './utils';
import { combine, split } from './objects';
import { read, write, isFolderExists } from './fileSystem';

export {
  // generateFiles,
  combine,
  split,
  write,
  read,
  isFolderExists,
  getFileInfo,
  getListContent,
};
