/* global test, describe, it, expect */

// const { existsSync, access } = require ('fs')
// const path = require('path')

// const file = path.resolve(__dirname, './data/Allergy/allergies.json')
//
// describe('testing if allergies file are exists', () => {
//   // @TODO update this explanation
//   test('xxx', () => {
//     // var stream = chickenKyiv.getIngredients3()
//     // expect(stream).not.toBe('')
//
//     expect(existsSync(file)).toBe(true)
//   })
// })
const  { generateFiles } = require('./index')
const path = require('path')
const path1 = path.join(__dirname, '../../sd/src')

console.log(path1 );
describe('testing if generateFiles() working', () => {
    test('Test', () => {
        
        generateFiles(path1)
        
    })
})