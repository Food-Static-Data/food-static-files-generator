import { write, save, makeFolder } from './fileSystem';

describe('testing fileSystem', () =>{
  test('testing function write()', () => {
    write('./output/test.json',[{'name':'Test'}], status => {
      expect(status).toBe(true);
    });
  })
  test('testing function save()', () => {
    save('./output', 'xyz.json', 'abc', true, status => {
      expect(status).toBe(true);
    });
  });
  test('testing function makeFolder()', () => {
    let res = makeFolder('./output/', 'xyz.json');
    expect(res).toBe('./output/xyz_elements');
  });
})