import {
  usersGrocery,
  // favorites,
  // getMenuGenerator,
  // items,
  
} from './generateArray';

import {
  getMeasurementSystem,
  getMeasurementUnits,
} from './measurements'
// @TODO we has commented methods here before.
// not sure why we also completely delete them
const config = [
  // {
  //   name: 'measurementSystem',
  //   data: getMeasurementSystem(),
  // },
  {
    fileName: 'measurementUnits',
    data: getMeasurementUnits,
  },
  {
    fileName: 'usersGrocery',
    data: usersGrocery,
  },
];

export default config ;
