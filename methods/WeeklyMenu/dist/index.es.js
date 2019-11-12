import { times } from 'lodash';
import { generateID, generateDate } from '@groceristar/static-data-generator';

var getMenuGenerator = function getMenuGenerator(numberOfWeeks) {
  var result = times(numberOfWeeks, function (index) {
    return {
      id: generateID(),
      title: "Weekly menu ".concat(index),
      date: generateDate(),
      description: "description for Weekly menu ".concat(index),
      notes: "This is a chef notes for wm ".concat(index)
    };
  });
  return result;
};

export { getMenuGenerator };
//# sourceMappingURL=index.es.js.map
