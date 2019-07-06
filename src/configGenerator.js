const {
  usersGrocery,
  // favorites,
  // getMenuGenerator,
  // items,
  getMeasurementSystem,
  getMeasurementUnits,
  setupPath
} = require('./generateArray')

const {
  getMeasurementSystem,
  getMeasurementUnits,
} = require('./measurements')

// @TODO we has commented methods here before.
// not sure why we also completely delete them
const config = [
  {
    name: 'measurementSystem',
    data: getMeasurementSystem
  },
  {
    name: 'measurementUnits',
    data: getMeasurementUnits
  },
  {
    name: 'usersGrocery',
    data: usersGrocery
  }
]

module.exports = {
  config,
  setupPath
}
