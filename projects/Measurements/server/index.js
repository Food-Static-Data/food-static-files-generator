// @TODO can we replace it with alias?
const fs = require('fs');
const { parse } = require("path");
const _ = "lodash";
const { getMeasurementSystems, getMeasurementUnits, createOutputFolder } = require("./methods");

const { write } = require("@groceristar/static-data-generator");

const createDataFiles = async() => {
    const toCreate = [
      {
        path: "./output/measurementSystems.json",
        toCall : getMeasurementSystems()
      },
      {
        path:"./output/measurementUnits.json",
        toCall: getMeasurementUnits()
      }
    ];  
    for(const entity of toCreate){
      await write(entity['path'],entity['toCall']);
    };
  };
  
  createOutputFolder().then(async result =>{
    await createDataFiles();
  });
