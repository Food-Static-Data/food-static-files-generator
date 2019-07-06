// const filePath = require('../files')
const fs = require('fs')
const PATH = require('path')
const srcUtils = require('./../src/utils')
    //const { promisify } = require('util') // ?? it's utils of not *** Answer : NO. It's using for writing data in json
    // const { promisify } = require('util')
    // const _ = require('lodash')

/**
 * for makeReadable()
 * @param {Object} data a json object
 * */
function makeReadable(data) {
    var dataStr = JSON.stringify(data)

    const replaceList = [
      [ '/{"/g',  '{ "' ],
      [ '/{"/g',  '{ " ' ],
      [ '/},{/g', ' },\n{' ],
      [ '/":/g',  '": ' ],
      [ '/,"/g', ',\n "' ]
    ]

    replaceList.forEach((replacer) => {
      dataStr = dataStr.replace(replacer[0], replacer[1])
    })

    return dataStr
}

/**
 * Write in file
 * @param {String} path
 * @param {Object} data
 */
function writeFile(path, data) {
    var dataStr = makeReadable(data)
        //dataStr = '[' + dataStr + ']'
        //console.log(dataStr)

    fs.writeFile(path, dataStr, function(err) {
        if (err) {
          return console.log(err)
        }

        console.info(path + ' file generated successfully!')
    })
}

// execute function
// writeFiles()

/**
 * For fixPath()
 * @param {String} path
 */
function fixPath(path) {
  // absolute path
  path = PATH.resolve(__dirname, path)
  // path correction
  if (path[-1] !== '/') {
    path = path + '/'
  }
  return path
}

/**
 * readData()
 * @param {string} path
 * @param {string} file
 * */
 // @TODO if inside at this function we use path+file, maybe it's better to pass one variable?
function readData(path, file) {
    console.log(path + file);

    let data = fs.readFileSync(path + file)
    console.log(data);

    let fileData = JSON.parse(data)
    return fileData
}

/**
 * @param {String} folderNamePath
 * @param {String} file
 * @param {Object} fileData
 * @param {var} flag
 * */
function saveFile(folderNamePath, file, fileData, flag) {
    var fileDataLength = fileData.length
    for (var i = 0; i < fileDataLength; i++) {
        var fileName = getFileName(file, fileData[i], flag, i)
        var elementPath = folderNamePath + '/' + fileName
        writeFile(elementPath, fileData[i])
    }
}

/**
 * @param {String} path
 * @param {String} file
 */
function makeFolder(path, file) {
    var folderName = file.slice(0, -5) + '_elements'
    var folderNamePath = path + folderName
    // @TODO if we update our import - we'll be able to use just isDirectory()
    if (srcUtils.isDirectory(folderNamePath)) {
        fs.mkdirSync(folderNamePath)
    }
    return folderNamePath
}

/**
 * For splitObject
 *
 * @describe split large files into single elements
 *
 * @param {String} fullPath
 * @param {var} flag
 * @param {var} keys
 * @param {var} callback
 */
 function splitObject(fullPath, flag = 1,  keys = [], callback) {
     /*
       flag=1 ==> name according to index
       flag=0 ==> name according to "name" attribute
     */
     const file = PATH.basename(fullPath)
     let path = PATH.parse(fullPath).dir

     if (PATH.extname(file) !== '.json') {
         console.log("Require .json file.")
         return
     }

    path = fixPath(path)

    // @TODO can we fix path outside of this function, so then we can path one variable here...
    // Reading data...
    let fileData = readData(path, file)
     // new folder to save splitted files
    var folderNamePath = makeFolder(path, file)
    // saving files
    saveFile(folderNamePath, file, fileData, flag)

    if (callback instanceof Function) {
      setTimeout(function() {
          callback(folderNamePath, keys)
      }, 1000)
    }
 }
// execute function
// splitObject()

/**
 * fixFileName()
 * @param {string} fileName
 */
function fixFileName(fileName) {
  fileName = fileName.replace(/ /g, '_') // Replace space with underscore
  fileName = fileName.toLowerCase() // Maintain Uniformity
  return fileName
}

/**
 * getFileName()
 * @param {string} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {var} index
 */
function getFileName(file, fileData, flag, index) {
    var fileName
    if (flag === 1){
      // for example: 23-someJsonFile.json
      fileName = index + '-' + file
    } else {
      // for example: someValueOfName.json
      fileName = fileData.name + '.json'
    }

    fileName = fixFileName(fileName)
    return fileName
}

/**
 * For combineObjects()
 * @param {String} path Path of folder where all splitted files are stored
 * @param {var} keys List of keys that are to be removed
 */
function combineObject(path, keys) {
  let suffix = "_combined.json";
  path = fixPath(path)

  //read all json files
  // @TODO if we change our import we can call readAllFiles()
  var content = srcUtils.readAllFiles(path)
  //modifying structure
  content = updateContent(content, keys)
  // for example: elements_combined.json
  var fileNamePath = path + PATH.basename(path) + suffix
  //saving
  writeFile(fileNamePath, content)
}

/**
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
function updateContent(content, keys) {

  content.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key]
      })
    })
  })
  return content
}

module.exports = {
  writeFile,
  test,
  splitObject,
  combineObject,
  makeReadable,
  readData
}
