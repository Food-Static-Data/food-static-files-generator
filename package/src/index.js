import {
  isFolderExists,
  generateID,
  generateDate,
  getFileKey,
} from './utils';
import {
  combine,
  split 
} from './objects';
import {
  read, 
  write, 
  getFileInfo, 
  readDir,
  getListContent,
} from './fileSystem';

export {
  combine,
  split,
  write,
  read,
  readDir,
  isFolderExists,
  // utils methods below
  getFileInfo,
  getListContent,
  generateID,
  generateDate,
  getFileKey,
};
