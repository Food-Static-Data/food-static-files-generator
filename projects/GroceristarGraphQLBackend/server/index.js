const {
  getFavoritesKey,
  getDepartmentsKey,
  getUserGroceryKey,
  getItemsKey,
  getUsersKey,
  getIngredientsKey,
  getGroceryKey
} = require("./methods");

const fs = require('fs');
const { parse } = require("path");

// here we should call generator methods that will create a new files that we should have///

const { write } = require("@groceristar/static-data-generator");
// Create output directory 
fs.mkdir('./output',(error,result)=>{
  if(error){
      return console.log('Could not create directory');
  }
  console.log('Directory succesfully created');
})

// 1. for running quick tests

const tests = async()=>{
  await write("./output/test.json", [{ name: "Test" }]);
  fs.unlink('./output/test.json',(error,result)=>{
      if(error){
          return console.log('test.json could not be removed');
      }
      console.log('successfully deleted test.json');
  });
}

tests().then(()=>{
  console.log('tests successful');
}).catch((e)=>{
  console.log('Error :',e);
})

// 2. Create all the datastructures as required

const createDataFiles = async() => {
  const favourites_path = "./output/favourites.json";
  const department_path = "./output/department.json";
  const userGrocery_path = "./output/userGrocery.json";
  const items_path = "./output/items.json";
  const users_path = "./output/users.json";
  const ingredients_path = "./output/ingredients.json";
  const grocery_path = "./output/grocery.json";

  await write(favourites_path, getFavoritesKey());
  await write(department_path, getDepartmentsKey());
  await write(userGrocery_path, getUserGroceryKey());
  await write(items_path, getItemsKey());
  await write(users_path, getUsersKey());
  await write(ingredients_path, getIngredientsKey());
  await write(grocery_path, getGroceryKey());
};

createDataFiles();