1. we need to add basic tests for methods from objects.js files.
   it will cause an errors, because it looks like we break some code inside of it.
   by opening a PR we'll be forced to fix it and make tests for it works as well

2. at debug folder we have a simple version of how to test that our current methods working after running a build script. I think cases like this and also more advanced should be just covered by using Jest help.


3. before we have a file index.test.js
major idea of this file is simple - all methods, that exported from index.js for different reasons should be tested from the outside. I.e if we have export of `save` method from index.js - we should import `save` method from index.js - call it with default arguments and see working result. for this moment i'm removing index.test.js from `test` folder because it's empty and cause Travis CI build error
