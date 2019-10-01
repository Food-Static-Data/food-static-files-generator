import {
  getFileInfo,
  getListContent,
  generateID,
  generateDate,
  getFileKey,
} from './utils';
import { combine, split } from './objects';
import { read, write, isFolderExists } from './fileSystem';

export {
  // generateFiles,
  combine,
  split,
  write,
  read,
  isFolderExists,
  // utils methods below
  getFileInfo,
  getListContent,
  generateID,
  generateDate,
  getFileKey,
};
