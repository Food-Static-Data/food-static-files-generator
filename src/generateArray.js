const _ = require('lodash');
// const utils = require('@utils')
const utils = require('./utils');

const generateArrWithId = utils.generateArrWithId
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

function setupPath( pathToSrc ){
 files = require(pathToSrc + '/files')
}

// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
const getMenuGenerator = (numberOfWeeks) => {
  let
    result = _.times(numberOfWeeks, (index) => ({
      id: utils.__generateId(),  // @TODO change import so we can use __generateId() only
      title: `Weekly menu ${index}`,
      date: utils.__generateDate(),  // @TODO change import so we can use __generateId() only
      description: `description for Weekly menu ${index}`,
      notes: `This is a chef notes for wm ${index}`,
    }));
  return result;
};



// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
function favorites () {
  var groceryId = generateArrWithId(files.grocery, 'grocery_id')
  var usersId = generateArrWithId(files.users, 'user_id')
  var ingredientsId = generateArrWithId(
    files.ingredients,
   'ingredient_id'
   )

  const result = [];

  _.map(usersId, (user, index) => {
    result.push({
      ingredient_id: ingredientsId[index++].ingredient_id,
      user_id: user.user_id,
      favs: `desc for department${index}`,
      // one grocery id for all users
      grocery_id: groceryId[index++].grocery_id,
    });
  });

  return result;
}

// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
function usersGrocery() {
  const groceryId = generateArrWithId(grocery, 'grocery_id');
  const usersId = generateArrWithId(users, 'user_id');
  // return object for three users
  const result = [];

  _.map(usersId, (user, index) => {
    result.push({
      user_id: user.user_id,
      // one grocery id for all users
      grocery_id: groceryId[index++].grocery_id,
    });
  });
  return result;
}

// @TODO rename this method
function items() {
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
  usersGrocery,
  favorites,
  getMenuGenerator,
  items,

  setupPath
}
