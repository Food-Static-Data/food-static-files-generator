import { times } from 'lodash';
import { generateID, generateDate } from './utils';

const getMenuGenerator = (numberOfWeeks) => {
  const
    result = times(numberOfWeeks, index => ({
      id: generateID(),
      title: `Weekly menu ${index}`,
      date: generateDate(),
      description: `description for Weekly menu ${index}`,
      notes: `This is a chef notes for wm ${index}`,
    }));
  return result;
};

export default {
  getMenuGenerator,
};
