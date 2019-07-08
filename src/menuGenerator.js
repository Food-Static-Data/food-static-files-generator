import { times } from 'lodash';
import { __generateId, __generateDate } from './utils';

const getMenuGenerator = (numberOfWeeks) => {
  let
    result = times(numberOfWeeks, (index) => ({
      id: __generateId(),
      title: `Weekly menu ${index}`,
      date: __generateDate(),
      description: `description for Weekly menu ${index}`,
      notes: `This is a chef notes for wm ${index}`,
    }));
  return result;
};

export default {
  getMenuGenerator,
}
