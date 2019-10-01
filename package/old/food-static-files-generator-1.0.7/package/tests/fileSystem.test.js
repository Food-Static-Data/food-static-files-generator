import fs, { readdirSync, existsSync, unlinkSync } from 'fs';
import {
  write,
  save,
  makeFolder,
  read,
  isFolderExists,
} from '../src/fileSystem';

// @TODO use before hook for our variables later.
// see https://stackoverflow.com/questions/50580235/declaring-variable-in-beforeeach
const testFolder = './output/';
const testFile = 'test.json';
const testFullPath = testFolder + testFile;
const testFileContent = [{ name: 'Test' }];

// @TODO next step for us will be to extend our test with real cases.
// i.e. instead of passing simple array into test,
// we can actually run tests with our real files / objects

describe('testing function write()', () => {
  // test write()
  test('testing successul case', async () => {
    const result = await write(testFullPath, testFileContent);
    expect(result).toBe(true);
    expect(fs.existsSync(testFullPath)).toBe(true);
    fs.unlinkSync(testFullPath);
  });

  test('testing invalid file name', async () => {
    // I think this line can cause an error. But I can be wrong
    await expect(write(null, testFileContent)).rejects.toBeTruthy(); // throw an exception
  });

  test('testing null content', async () => {
    const result = await write(testFullPath, null);
    expect(result).toBe(true);
    expect(fs.existsSync(testFullPath)).toBe(true);
    fs.unlinkSync(testFullPath);
  });
});

describe('testing function save()', () => {
  // test save()
  test('testing function save()', async () => {
    const result = await save(
      testFolder,
      testFile,
      testFileContent.toString(),
      false,
    );
    expect(result).toBe(true);
  });
});

describe('testing function makeFolder()', () => {
  // test makeFolder()
  test('testing makeFolder()', async () => {
    const result = await makeFolder(testFolder, testFile);
    expect(result).toBe(`${testFolder}test_elements`);

    fs.rmdirSync(result);
  });
});

describe('testing function isFolderExists()', () => {
  test('test isFolderExists() returns true', async () => {
    const result = isFolderExists(testFolder);
    expect(result).toBe(true);
  });

  test('test isFolderExists() returns false', async () => {
    // @TODO lets make a const variable for path to folder and use
    // some important folders(few), like `src` or
    // `dist`(sometimes dist are actually removed, cleaned up)
    const result = isFolderExists('./nofolderxxx');
    expect(result).toBe(false);
  });
});

// test read()
describe('testing function read()', () => {
  test('testing succesfull case', async () => {
    // create a test file
    const testFileContentStr = JSON.stringify(testFileContent);
    fs.writeFileSync(testFullPath, testFileContentStr);

    // test read function
    const result = await read(testFullPath);
    expect(JSON.stringify(result)).toBe(testFileContentStr);

    // removed test file
    fs.unlinkSync(testFullPath);
  });

  test('testing with output', async () => {
    // @ODO later we can use consts from outside for cases like this.
    const outputFiles = readdirSync('./output/');
    let testPath, content, result;

    for (const file of outputFiles) {
      if (file !== 'undefined.json') {
        // @ODO later we can use consts from outside for cases like this.
        testPath = `./output/${file}`;
        // @TODO long line
        content = JSON.parse(fs.readFileSync(testPath));
        result = await read(testPath);
        expect(result).toStrictEqual(content);
      }
    }
  });
});
