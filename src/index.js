// @TODO I think we should make our module more accessible to our methods from the outside.

import  generateFiles from './generateFiles'


import {
  combine,
  split,
} from './objects';

import {
  readData,
  write
} from './fileSystem'


export {
  generateFiles,
  combine,
  split,
  write,
  readData
}
