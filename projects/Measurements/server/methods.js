const _ = require("lodash");
const uuidv1 = require('uuid/v1');

const generateID = () => uuidv1();
const generateArrWithId = (data, id) => {
  const result = [];
  _.map(data, (element) => {
    result.push({
      ...element,
      [id]: generateID(),
    });
  });

  return result;
};

// CHANGE sd-wrapper index.cjs -> index.cjs.js
const {
  measurementSystems,
  measurementUnits
} = require("@groceristar/sd-wrapper");

// // const setupPathMeasurements = pathToSrc => {
// //     files = require(pathToSrc + '/files');
// // };

const getMeasurementSystems = () => {
  // const files = setupPath("../../sd/src");
  const result = [];
  const measurementSystemId = generateArrWithId(measurementSystems, "id");

  _.map(measurementSystemId, system => {
    result.push({
      id: system.id,
      alias: system.alias,
      title: _.capitalize(system.alias)
    });
  });

  return result;
};

const getMeasurementUnits = () => {
  // const files = setupPath("../../sd/src");
  // const dirMeasurementUnits = parse(measurementUnits).dir;
  const result = [];

  // let measurementUnitsList = readAllFiles(dirMeasurementUnits)[1];
  let measurementUnitsList = measurementUnits
  measurementUnitsList = generateArrWithId(measurementUnitsList, "id");
  measurementUnitsList = generateArrWithId(measurementUnitsList, "system_id");

  _.map(measurementUnitsList, unit => {
    result.push({
      id: unit.id,
      system_id: unit.system_id,
      type: unit.type,
      name: unit.name,
      singular: unit.singular,
      plural: unit.plural,
      short: unit.short,
      pattern: unit.pattern,
      error: "null"
    });
  });
  return result;
};

module.exports = {
  // setupPathMeasurements,
  getMeasurementSystems,
  getMeasurementUnits
};
