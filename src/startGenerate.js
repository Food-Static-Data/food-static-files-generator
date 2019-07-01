
var { writeFile, readData } = require('./writeFile')


function setupGenerator(pathToSrc){
     writeFile('./src/settings.json', { pathToSrc: pathToSrc })

    setTimeout(() => {
    const { generateFiles } = require('./generateFiles')
    generateFiles(pathToSrc) 
},2000)
}

module.exports = {
    setupGenerator
}