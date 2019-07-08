// @TODO import this things here
// srcUtils
// fixPath
// updateContent
// PATH
// writeFile
//
//
// fixPath
// readData
// makeFolder
// saveFile


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
  write(fileNamePath, content)
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
