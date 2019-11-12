const {createOutputFolder} = require('../server/methods');
const { write } = require("@groceristar/static-data-generator");

test('Can create test.json', async() => {
    await createOutputFolder();
    await expect(write("./output/test.json", [{ name: "Test" }])).resolves.toBe(true);
});