const { write,getMeasurementSystem, getMeasurementUnits } = require("@groceristar/static-data-generator");
// const methods = require("./methods");
const fs = require('fs');
const {
  getKeyArrayDepAndIng,
  ultimateGroceryList,
  getDepartmentIngredients,
  getGroceryDepartmentsWithIngredients
 } = require("@groceristar/data-methods-gsoldserver");
const structures = require("./structures");

const {
 favorites,
 usersGrocery,
 getItemCustomStructureObjectArray
} = require("./structures");


// Create output directory 
fs.mkdir('./output',(error,result)=>{
  if(error){
      return console.log('Could not create directory');
  }
  console.log('Directory succesfully created');
})


// @TODO should we run a generator script for making a new files here?
// structures.favorites();


// 1. for running quick tests

const tests = async()=>{
  await write("./output/test.json", [{ name: "Test" }]);
  fs.unlink('./output/test.json',(error,result)=>{
      if(error){
          throw new Error('test.json could not be removed');
      }
      console.log('successfully deleted test.json');
  });
}

tests().then(()=>{
  console.log('tests successful');
}).catch((e)=>{
  console.log('Error :',e.message);
})


// 2. just testing write method with more real data
// const generatedFilesPath = "./output/test.json";
// write(generatedFilesPath, favorites());
// write(generatedFilesPath, usersGrocery());
// write(generatedFilesPath, getItemCustomStructureObjectArray());


const checkWithRealData = async()=>{
  const favorites_path = "./output/favourites.json";
  const usersGrocery_path = "./output/usersGrocery.json";
  const getItemCustomStructureObjectArray_path = "./output/getItemCustomStructureObjectArray.json";
  await write(favorites_path, favorites());
  await write(usersGrocery_path, usersGrocery());
  await write(getItemCustomStructureObjectArray_path,getItemCustomStructureObjectArray());
}

checkWithRealData().then(()=>{
  console.log('Files generated');
}).catch((e)=>{
  console.log('Error : ',e.message);
});

// 3. same as "using generateFile method here instead of previous versions just for testing how it works"
// const generateFile = require('./generateFile')
// generateFile();
