// @TODO can we replace it with alias?
const fs = require('fs');
const { parse } = require("path");
const _ = "lodash";
const { getMeasurementSystems, getMeasurementUnits } = require("./methods");

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



// 2. just testing write method with more real data

const checkWithRealData = async()=>{
    const generatedFilesPath_ms = "./output/ms.json";
    const generatedFilesPath_mu = "./output/mu.json";
    await write(generatedFilesPath_ms, getMeasurementSystems());
    await write(generatedFilesPath_mu, getMeasurementUnits());
}

checkWithRealData().then(()=>{
    console.log('Files generated');
}).catch((e)=>{
    console.log('Error : ',e);
});

// 3. same to "using generateFile method here instead of previous versions just for testing how it works"
// const generateFile = require('./generateFile')
// generateFile();
