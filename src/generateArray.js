const _ = require('lodash');
// const utils = require('@utils')
const { generateArrWithId } = require('./utils');

// const {
//   users,
//   grocery,
//   ingredients,
//   measurementSystem,
//   measurementUnits
// } = require('@files')
// const { pathToSrc }  = require('./settings.json')
// console.log("path to src");

// console.log(pathToSrc);

//@TODO maybe in future it can be improved
var files;

function setupPath(pathToSrc){
 files = require(pathToSrc.concat('/files'));
}

function getItemObjArr() {
  const ingredientsId = generateArrWithId(ingredients, 'ingredient_id');
  const items = [1, 2, 3];
  const result = [];

  _.map(items, (item, index) => {
    result.push({
      item_id: item,
      name: ingredientsId[index++].name,
      description: 'something about the item',
      quantity: 50,
      purchase: false,
    });
  });

  return result;
}

module.exports = {
  getItemObjArr,
  setupPath
}
