import {
  usersGrocery,
  // favorites,
  // getMenuGenerator,
  // items,
  getMeasurementSystem,
  getMeasurementUnits
} from './generateArray';

// @TODO we has commented methods here before.
// not sure why we also completely delete them
const config = [
  {
    name: 'measurementSystem',
    data: getMeasurementSystem(),
  },
  {
    name: 'measurementUnits',
    data: getMeasurementUnits(),
  },
  {
    name: 'usersGrocery',
    data: usersGrocery(),
  },
];

export default { config };
