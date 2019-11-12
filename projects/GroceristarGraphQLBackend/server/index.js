const {
  getFavoritesKey,
  getDepartmentsKey,
  getUserGroceryKey,
  getItemsKey,
  getUsersKey,
  getIngredientsKey,
  getGroceryKey,
  createOutputFolder
} = require("./methods");

const fs = require('fs');
const { parse } = require("path");

// here we should call generator methods that will create a new files that we should have///

const { write } = require("@groceristar/static-data-generator");

const createDataFiles = async() => {
  const toCreate = [
    {
      path: "./output/favourites.json",
      toCall : getFavoritesKey()
    },
    {
      path:"./output/department.json",
      toCall: getDepartmentsKey()
    },
    {
      path:"./output/userGrocery.json",
      toCall: getUserGroceryKey()
    },
    {
      path:"./output/items.json",
      toCall: getItemsKey()
    },
    {
      path:"./output/users.json",
      toCall: getUsersKey()
    },
    {
      path:"./output/ingredients.json",
      toCall:getIngredientsKey()
    },
    {
      path:"./output/grocery.json",
      toCall: getGroceryKey()
    }
  ];

  for(const entity of toCreate){
    await write(entity['path'],entity['toCall']);
  };
};

createOutputFolder().then(async result =>{
  await createDataFiles();
});