import { write, save, makeFolder } from '../src/fileSystem';


// @todo I think we should separate our tests into different describe blocks.
// so it will look more clear. Right now our block related to fileSystem file, not to a method as it stated.
// 1. have 3 describe blocks for our methods.
// 2. have different explanations at describe blocks

// also one of our methods is not finished/upgraded in order to use async way.
// tests for these methods are very important, because we're using these methods frequently and highly rely on them

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
