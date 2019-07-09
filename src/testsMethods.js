// @TODO WTF tests are doing there? bad bad bad coder did it!
// test expecting json file not to be empty
const jsonFileNotEmptyTest = (file) => {
  describe(`tests for ${file}`, () => {
    it(`${file} data files returns array`, () => {
      expect(file).not.toBe('');
    });
  });
};

const jsonSchemaTest = (file, example, schema) => {
  describe(`test ${file} json schema`, () => {
    it(`validates ${file} json-schema`, () => {
      expect(example).toMatchSchema(schema);
    });
  });
};


export  {
  jsonFileNotEmptyTest,
  jsonSchemaTest,
};
