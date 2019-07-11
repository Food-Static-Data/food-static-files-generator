// trying to separate code from generate Array.
// but we'll move them out soon.
// @TODO can we replace it with alias?
import utils from './utils';
// import utils from ('./utils')
import PATH from 'path';
import _ from 'lodash'
// Without files it wouldn't work without files... - Answer yes, I will fix it PS. Vadim :)
var files = '';

const setupPathMeasurements = pathToSrc => {
    files = require(pathToSrc + '/files');
};
// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
function getMeasurementSystem() {
  const result = [];
  const measurementSystemId = generateArrWithId(
    files.measurementSystem,
    'id',
  );

  _.map(measurementSystemId, (system) => {
    result.push({
      id: system.id,
      alias: system.alias,
      title: _.capitalize(system.alias),
    });
  });
  return result;
}


// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
const getMeasurementUnits = () => {
    const dirMeasurementUnits = PATH.parse(files.measurementUnits).dir;

    let measurementUnitsList = readAllFiles(dirMeasurementUnits)[1];

    const result = [];

    measurementUnitsList = generateArrWithId(
      measurementUnitsList,
      'id',
    );
    measurementUnitsList = generateArrWithId(
      measurementUnitsList,
      'system_id',
    );

    _.map(measurementUnitsList, (unit) => {
      result.push({
        id: unit.id,
        system_id: unit.system_id,
        type: unit.type,
        name: unit.name,
        singular: unit.singular,
        plural: unit.plural,
        short: unit.short,
        pattern: unit.pattern,
        error: 'null',
      });
    });

    return result;
 
}


export {
  setupPathMeasurements,
  getMeasurementSystem,
  getMeasurementUnits,
};
