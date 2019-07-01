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
const  { setupGenerator } = require('../index')
// const  { setupGenerator } = require('../../dist/index.cjs')

const path = require('path')
const path1 = path.join(__dirname, '../../../sd/src')



console.log(path1 );
setupGenerator(path1)

// describe('testing if generateFiles() working', () => {
//     test('Test', () => {
        
        
        
//     })
// })