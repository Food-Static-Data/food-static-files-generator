<<<<<<< HEAD
import {
  getMeasurementSystem,
  getMeasurementUnits
} from './measurements';
import usersGrocery from './groceristarStructures';
=======
import { getMeasurementSystem, getMeasurementUnits } from './measurements';
import { usersGrocery } from './groceristarStructures';
>>>>>>> resolved the build issues related to exports

// @TODO we has commented methods here before.
// not sure why we also completely delete them
const config = [
  {
    fileName: 'measurementSystem',
    data: getMeasurementSystem,
  },
  {
    fileName: 'measurementUnits',
    data: getMeasurementUnits,
  },
  {
    fileName: 'usersGrocery',
    data: usersGrocery,
  },
];

export default config
