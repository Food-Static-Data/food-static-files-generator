const _ = require('lodash');
// const utils = require('@utils')
const utils = require('./utils');

// const {
//   users,
//   grocery,
//   ingredients,
//   measurementSystem,
//   measurementUnits
// } = require('@files')
const { pathToSrc } = require('./settings.json');

console.log('path to src');

console.log(pathToSrc);

const {
  users,
  grocery,
  ingredients,
  measurementSystem,
  measurementUnits,
} = require(`${pathToSrc}/files`);

// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
const getMenuGenerator = (numberOfWeeks) => {
  const
    result = _.times(numberOfWeeks, index => ({
      id: utils.__generateId(),
      title: `Weekly menu ${index}`,
      date: utils.__generateDate(),
      description: `description for Weekly menu ${index}`,
      notes: `This is a chef notes for wm ${index}`,
    }));
  return result;
};

// @TODO
// 1. this function looks like a duplicate with getFileKey
// 2. it's pretty useful for other cases, so i think we should move it into utils and reuse
function generateArrWithId(data, id) {
  const result = [];
  _.map(data, (element) => {
    result.push({
      ...element,
      [id]: utils.__generateId(),
    });
  });

  return result;
}

// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
function favorites() {
  const groceryId = generateArrWithId(grocery, 'grocery_id');
  const usersId = generateArrWithId(users, 'user_id');
  const ingredientsId = generateArrWithId(ingredients, 'ingredient_id');

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

// @TODO this is a method from a project. maybe we should move it there, because it's confusing right now
function getMeasurementSystem() {
  const result = [];
  const measurementSystemId = generateArrWithId(measurementSystem, 'id');

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
function getMeasurementUnits() {
  const result = [];
  let measurementUnitsId = generateArrWithId(measurementUnits, 'id');
  measurementUnitsId = generateArrWithId(measurementUnitsId, 'system_id');

  _.map(measurementUnitsId, (unit) => {
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

module.exports = {
  usersGrocery,
  favorites,
  getMenuGenerator,
  items,
  getMeasurementSystem,
  getMeasurementUnits,
};
