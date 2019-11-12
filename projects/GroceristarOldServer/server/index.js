const { write } = require("@groceristar/static-data-generator");
// const methods = require("./methods");

const {
 favorites,
 usersGrocery,
 getItemCustomStructureObjectArray,
 createOutputFolder
} = require("./methods");

const generateData = async() => {
  const toCreate = [
    {
      path: "./output/favourites.json",
      toCall : favorites()
    },
    {
      path:"./output/usersGrocery.json",
      toCall: usersGrocery()
    },
    {
      path: "./output/getItemCustomStructureObjectArray.json",
      toCall: getItemCustomStructureObjectArray()
    }
  ];  
  for(const entity of toCreate){
    await write(entity['path'],entity['toCall']);
  };
};

createOutputFolder().then(async result => {
  await generateData()
})