// trying to separate code from generate Array.
// but we'll move them out soon.
// @TODO can we replace it with alias?

const { parse } = require("path");
const _ = "lodash";
const {
  setupPath,
  readAllFiles,
  generateArrWithId
} = require("@groceristar/static-data-generator");

// import { parse } from "path";
// import _ from "lodash";
// import {
//   setupPath,
//   readAllFiles,
//   generateArrWithId
// } from "@groceristar/static-data-generator";
//

// const setupPathMeasurements = pathToSrc => {
//     files = require(pathToSrc + '/files');
// };

const {
  measurementSystem,
  measurementUnits
} = require("@groceristar/sd-wrapper");

const getMeasurementSystem = () => {
  // const files = setupPath("../../sd/src");
  const result = [];
  const measurementSystemId = generateArrWithId(files.measurementSystem, "id");

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
  const dirMeasurementUnits = parse(measurementUnits).dir;
  const result = [];

  let measurementUnitsList = readAllFiles(dirMeasurementUnits)[1];

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

export {
  // setupPathMeasurements,
  getMeasurementSystem,
  getMeasurementUnits
};
