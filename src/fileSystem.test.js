import { write, save, makeFolder } from './fileSystem';

describe('testing fileSystem()', () =>{
    test('testing function write()', () => {
        write('./output/test.json',[{'name':'Test'}], status => {
          expect(status).toBe(true);
        });
    });

    test('testing function write()', () => {
      save('./output/', 'test.json', "[{'name':'Test'}]", false, status => {
        expect(status).toBe(true);
      });
    });

    test('testing makeFolder()', () => {
      const result = makeFolder('./output/', 'test.json');
      expect(result).toBe('./output/test_elements');
    })
} )