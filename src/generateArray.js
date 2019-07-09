import { map } from 'lodash';
import { generateArrWithId } from './utils';


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

const setupPath = pathToSrc => {
 files = require(pathToSrc + '/files');
};

// @TODO this method should be also moved out.
// yes, my function name is not better, but at least it's less confusing
const getItemCustomStructureObjectArray = () => {
  const ingredientsId = generateArrWithId(ingredients, 'ingredient_id');
  const items = [1, 2, 3];
  const result = [];

  map(items, (item, index) => {
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

export default {
  setupPath,
  getItemObjArr
}
