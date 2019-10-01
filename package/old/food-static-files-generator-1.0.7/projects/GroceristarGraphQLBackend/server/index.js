const {
  getFavoritesKey,
  getDepartmentsKey,
  getUserGroceryKey,
  getItemsKey,
  getUsersKey,
  getIngredientsKey,
  getGroceryKey
} = require("./methods");

// here we should call generator methods that will create a new files that we should have///

const { write } = require("../dist/index.cjs");

write("./output/test.json", [{ name: "Test" }]);
