const {createOutputFolder} = require('../server/methods');
const { write } = require("@groceristar/static-data-generator");
const { getMenuGenerator } = require("../server/methods");

test('Can create test.json', async() => {
    await createOutputFolder();
    await expect(write("./output/test.json", [{ name: "Test" }])).resolves.toBe(true);
});

test('Testing data with getMenuGenerator',async()=>{
    await createOutputFolder();
    await expect(write("./output/menuGenerator_test.json",getMenuGenerator(2))).resolves.toBe(true);
})
