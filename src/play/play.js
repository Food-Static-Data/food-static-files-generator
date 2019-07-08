// const arr = require('../../src/filesObjects')
// // const arr = require('@filesObjects')

// // @TODO lodash and move forward with this assessment

// var _ = require('lodash')

// // arr.cup1.forEach(function (value) {
// //   console.log(value)
// // })

// // arr.halfCup.forEach(function (value) {
// //   console.log(value)
// // })

// _.forEach(arr, function (value) {
//   console.log(value)
// })

// -------------------------------------------------------
const path = require('path');
const { generateFiles } = require('../index');
// const  { generateFiles } = require('../../dist/index.cjs')


const path1 = path.join(__dirname, '../../../sd/src');


console.log(path1);
generateFiles(path1);

// ---------------------------------------------------------
// describe('testing if generateFiles() working', () => {
//     test('Test', () => {


//     })
// })

// var files = {
//     users: "n"
// };

// console.log(files);

// var {
//   users,
// } = files

// console.log(users);

// function setupPath(pathToSrc){
//  files = {
//      users:"ok",
//      drone:"I am Ok"
//  }

//  Object.keys(files).forEach(function (key) {
//      console.log("Objects");
//     console.log(key);

//     console.log(files[key]);

//   })
// }

// setupPath()
// console.log(users);
// console.log(files);
