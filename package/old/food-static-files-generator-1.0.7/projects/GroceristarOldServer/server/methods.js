/* eslint-disable */

// @TODO replace later with ES6 version
const _ = require("lodash");
const { generateID } = require("@groceristar/static-data-generator");

const {
  departments,
  ingredients,
  grocery
} = require("@groceristar/sd-wrapper");

/**
 * @returns {array} of keys for departments and ingredients
 */
const getKeyArrayDepAndIng = () => {
  const keys = [];

  const departments = getAllDepartmentsWithId();
  const ingredients = getAllIngredientsWithId();

  _.forEach(departments, department => {
    _.forEach(ingredients, ingredient => {
      if (_.includes(ingredient, department.name)) {
        keys.push({
          [department.key]: ingredient.key
        });
      }
    });
  });

  return keys;
};

// get ultimate grocery list for each grocery store
const ultimateGroceryList = () => {
  const ultimategroceries = [];
  const groceries = getAllGroceryWithId();

  _.map(groceries, grocery => {
    const ultimategrocery = {};

    ultimategrocery.name = grocery.name;
    ultimategrocery.groceryId = grocery.key;
    ultimategroceries.messages = {};
    ultimategrocery.departments = getGroceryDepartmentsWithIngredients(
      grocery.departments,
      grocery.key
    );
    ultimategrocery.ultimate = { name: grocery.name, id: grocery.key };

    ultimategroceries.push(ultimategrocery);
  });

  return ultimategroceries;
};

// get all departments with their ingredients in a grocery
const getGroceryDepartmentsWithIngredients = (grocerydepartments, key) => {
  const results = [];
  const departments = getAllDepartmentsWithId();
  _.map(grocerydepartments, grocerydepartment => {
    // search for a particular grocery department in the department json to get the department object
    const department = _.filter(
      departments,
      department => department.name === grocerydepartment
    );

    if (department) {
      const departmentIngredients = {
        id: department.key,
        name: department.name,
        type: department.type
      };

      departmentIngredients.ingredients = getDepartmentIngredients(
        grocerydepartment,
        key
      ); // add all the ingredients in this department to the obj
      results.push(departmentIngredients);
    }
  });

  return results;
};

// get all ingredients in a department
const getDepartmentIngredients = (department, key) => {
  const results = [];
  const ingredients = getAllIngredientsWithId();
  _.map(ingredients, ingredient => {
    if (_.includes(ingredient, department)) {
      const ingredientItem = [
        ingredient.key,
        ingredient.name,
        `/del/ing/${ingredient.key}/${key}`
      ];
      results.push(ingredientItem);
    }
  });

  return results;
};

// get grocery with key
const getAllGroceryWithId = () => {
  const result = getResult(grocery);

  return result;
};

const getAllDepartmentsWithId = () => {
  const result = getResult(departments);

  return result;
};

const getAllIngredientsWithId = () => {
  const result = getResult(ingredients);

  return result;
};

const getResult = property =>
  _.map(property, p => ({
    key: generateID(),
    ...p
  }));

module.exports = {
  getKeyArrayDepAndIng,
  ultimateGroceryList,
  getDepartmentIngredients,
  getGroceryDepartmentsWithIngredients
};
