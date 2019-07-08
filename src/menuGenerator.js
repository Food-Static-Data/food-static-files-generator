const _ = require('lodash');
const {
  __generateId,
  __generateDate,
  generateArrWithId,
} = require('./utils');

const getMenuGenerator = (numberOfWeeks) => {
  let
    result = _.times(numberOfWeeks, (index) => ({
      id: __generateId(),
      title: `Weekly menu ${index}`,
      date: __generateDate(),
      description: `description for Weekly menu ${index}`,
      notes: `This is a chef notes for wm ${index}`,
    }));
  return result;
};

module.exports = {
  getMenuGenerator,
}
