/* eslint-disable */
const { map } = require("lodash");
const {
  setupPath
} = require("@groceristar/static-data-generator");
const _ = require('lodash')

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

// import { map } from "lodash";
// import {
//   generateArrWithId,
//   setupPath
// } from "@groceristar/static-data-generator";

const { grocery, users, ingredients } = require("@groceristar/sd-wrapper");

// console.log(grocery)
// console.log(users)
// console.log(ingredients)

const favorites = () => {
  // const files = setupPath("../../sd/data");
  const groceryId = generateArrWithId(grocery, "grocery_id");
  const usersId = generateArrWithId(users, "user_id");
  const ingredientsId = generateArrWithId(ingredients, "ingredient_id");

  const result = [];

  map(usersId, (user, index) => {
    result.push({
      ingredient_id: ingredientsId[index++].ingredient_id,
      user_id: user.user_id,
      favs: `desc for department${index}`,
      // one grocery id for all users
      grocery_id: groceryId[(index += 1)].grocery_id
    });
  });

  return result;
};

const usersGrocery = () => {
  // const files = setupPath("../../sd/src");
  const groceryId = generateArrWithId(grocery, "grocery_id");
  const usersId = generateArrWithId(users, "user_id");
  // return object for three users
  const result = [];

  map(usersId, (user, index) => {
    result.push({
      user_id: user.user_id,
      // one grocery id for all users
      grocery_id: groceryId[(index += 1)].grocery_id
    });
  });
  return result;
};

// yes, my function name is not better, but at least it's less confusing
const getItemCustomStructureObjectArray = () => {
  // const files = setupPath("../../sd/data");
  const ingredientsId = generateArrWithId(ingredients, "ingredient_id");
  const items = [1, 2, 3];
  const result = [];

  map(items, (item, index) => {
    result.push({
      item_id: item,
      name: ingredientsId[(index += 1)].name,
      description: "something about the item",
      quantity: 50,
      purchase: false
    });
  });

  return result;
};

// export { favorites, usersGrocery, getItemCustomStructureObjectArray };

module.exports = { favorites, usersGrocery, getItemCustomStructureObjectArray };
