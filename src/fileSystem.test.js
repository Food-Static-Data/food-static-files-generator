import { write } from './fileSystem';

describe('testing fileSystem', () =>{
    test('testing function write()', () => {
        write('./output/test.json',[{'name':'Test'}])
    })
} )