import { write, save, makeFolder } from '../src/fileSystem';

describe('testing fileSystem()', () => {
  // test write()
  test('testing function write()', async () => {
    const result =  await write('./output/test.json', [{
      'name': 'Test'
    }]);
    expect(result).toBe(true);
  });

  // test save()
  test('testing function save()', async () => {
    const result = await save('./output/', 'test.json', "[{'name':'Test'}]", false);
    expect(result).toBe(true);
  });

  // test makeFolder()
  test('testing makeFolder()', () => {
    const result = makeFolder('./output/', 'test.json');
    expect(result).toBe('./output/test_elements');
  })
})
