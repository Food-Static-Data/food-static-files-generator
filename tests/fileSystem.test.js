import fs from "fs";
import { write, save, makeFolder } from "../src/fileSystem";

describe("testing fileSystem", () => {
  const testFolder = "./output/";
  const testFile = "test.json";
  const testFullPath = testFolder + testFile;
  const testFileContent = [{ name: "Test" }];

  describe("testing function write()", () => {
    // test write()
    test("testing successul case", async () => {
      const result = await write(testFullPath, testFileContent);
      expect(result).toBe(true);
      expect(fs.existsSync(testFullPath)).toBe(true);
      fs.unlinkSync(testFullPath);
    });

    test("testing invalid file name", async () => {
      await expect(write(null, testFileContent)).rejects.toBeTruthy(); // throw an exception
    });

    test("testing null content", async () => {
      const result = await write(testFullPath, null);
      expect(result).toBe(true);
      expect(fs.existsSync(testFullPath)).toBe(true);
      fs.unlinkSync(testFullPath);
    });
  });

  describe("testing function save()", () => {
    // test save()
    test("testing function save()", async () => {
      const result = await save(
        testFolder,
        testFile,
        testFileContent.toString(),
        false
      );
      expect(result).toBe(true);
    });
  });

  describe("testing function makeFolder()", () => {
    // test makeFolder()
    test("testing makeFolder()", async () => {
      const result = await makeFolder(testFolder, testFile);
      expect(result).toBe(`${testFolder}test_elements`);
    });
  });
});
