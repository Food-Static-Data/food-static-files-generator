const fs = require('fs')
var { writeFile, readData } = require('./writeFile')
// var {
//   usersGrocery,
//   favorites,
//   getMenuGenerator,
//   items,
//   getMeasurementSystem,
//   getMeasurementUnits
// } = require('./generateArray')



const {
  config, setupPath
} = require('./configGenerator')

// @TODO I don't like that we have all of these path manipulations inside of this method
// folderData = './src/data/'
function generateFiles (pathToSrc) {
    // console.log(config[0]["data"]())
    setupPath(pathToSrc)

    config.map(settings => {
      var fileName = settings['name']
      // @TODO I don't like this long line
      var folder = fileName.charAt(0).toUpperCase() + fileName.slice(1)
      //   var path = './output/' + fileName + '.json';
      var folderPath = pathToSrc +'/data/' + folder

      // @TODO use isDirectory?
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }

      var path = folderPath + '/' + fileName + '.json'
      var data = settings['data']()

      writeFile(path, data)
    })


}

module.exports = {
  generateFiles
}
