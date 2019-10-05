var StaticFilesGenerator = (function (exports, lodash, staticDataGenerator) {
  'use strict';

  var getMenuGenerator = function getMenuGenerator(numberOfWeeks) {
    var result = lodash.times(numberOfWeeks, function (index) {
      return {
        id: staticDataGenerator.generateID(),
        title: "Weekly menu ".concat(index),
        date: staticDataGenerator.generateDate(),
        description: "description for Weekly menu ".concat(index),
        notes: "This is a chef notes for wm ".concat(index)
      };
    });
    return result;
  };

  exports.getMenuGenerator = getMenuGenerator;

  return exports;

}({}, lodash, staticDataGenerator));
