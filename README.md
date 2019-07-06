[![Build Status](https://travis-ci.org/GroceriStar/food-static-files-generator.svg?branch=master)](https://travis-ci.org/GroceriStar/food-static-files-generator)

[![Maintainability](https://api.codeclimate.com/v1/badges/01c06647a2b62bec8b91/maintainability)](https://codeclimate.com/github/GroceriStar/food-static-files-generator/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/01c06647a2b62bec8b91/test_coverage)](https://codeclimate.com/github/GroceriStar/food-static-files-generator/test_coverage)


We need to update readme here!



we need to create a plan, about what and how this new version of generator will work and where we'll save files, etc....
So before starting to code something new here - we need to have a long conversation with a team members




at jsonlint we should check only new generated json files.
and we need to clean up a lot of things here are not necessary. let's discuss it as well



-----


#### Food tech static files generator module

Table of Contents
=================

 * [Synopsis](#synopsis)
 * [Additional information](#additional-information)
 * [Installation](#installation)
 * [Code Example](#code-example)
 * [Test](#tests)
 * [Contributors](#contributors)
 * [Credits](#credits)
 * [Junk](#junk)


#### Synopsis
  This is a module for using generator functions as a seperate module to generate static food data files
  The functions granted by this module are as follows:

@TODO update this section
### Generator commands
- `npm run generateFiles` or `yarn generateFiles`: generate all recipes in folder `dist`
- `npm run generateFile`  or `yarn generateFile`: generate meal on two weeks in folder `dist`
- `npm run generateArray` or `yarn generateArray`: More detailed information [here](#how-to-generate)

@TODO we need to update this section
## How to generate additional files
To run generator (it will run in writeFile.js function writeFiles()) `npm run generateFiles` to know if writing is success in console you will see `file generated successfully!` it will write multiple files.

In function `writeFiles()` should be array of files. In array config of objects.
First property in object should be `name` and value filename, the second `data` and in value set function that returns data.

Also you can write one file using function `writeFile()` just give it two parameters first -  `path`, second `data` that will need to write. Data should be object and JSON format.

## Methods that generating custom js objects

**getMenuGenerator(number_of_weeks)** - return an array of objects with weekly menu. Menus sorted in calendar date order starting from first.
~~~~
[
  {
    id: __generatedID,
    title: String,
    date: __generatedDate,
    description: String,
    notes: String,
  },
]
~~~~

**favorites()** - returns an array of objects, where each object has ingredients and groceries for specified user
~~~
[
  {
    ingredient_id: String,
    user_id: String,
    favs: String,
    grocery_id: String,
  },
]
~~~

**usersGrocery()** - returns an array of objects, where each object has userID and groceryID
~~~
[
  {
    user_id: String,
    grocery_id: String,
  },
]
~~~

**items()** - returns an array of objects, where each object has item parameters
~~~
[
  {
    item_id: String,
    name: String,
    description: String,
    quantity: Number,
    purchase: Boolean,
  },
]
~~~

**getMeasurementUnits()** - returns an array of objects, where each object has measurement unit parameters
~~~
[
  {
    id: String,
    system_id: String,
    type: String,
    name: String,
    singular: String,
    plural: String,
    short: String,
    pattern: String,
    error: Null,
  }
]
~~~

**getMeasurementSystem()** - returns an array of objects, where each object has... measurements
~~~
[
  {
    id: String,
    alias: String,
    title: String,
  }
]
~~~

**getFavoritesKey()** - returns an array of objects, where each object has key,ingredients and groceries for specified user
~~~
[
  {
    key:String,
    ingredient_id: String,
    user_id: String,
    favs: String,
    grocery_id: String
  }
]
~~~

**getDepartmentsKey()** - returns an array of objects, where each object has generated department_id,department,created and updated date
~~~
[
  {
  department_id: String
    name: String,
    desc: String,
    created_at: Date,
    updated_at: Date
  }
]
~~~


**getUserGroceryKey()** - returns an array of objects, where each object has key and userID and groceryID
~~~
[
  {
    key:String,
    user_id: String,
    grocery_id: String
  }
]
~~~

**getItemsKey()** - returns an array of objects, where each object has key and item parameter
~~~
[
  {
    key:String,
    item_id: String,
    name: String,
    description: String,
    quantity: Number,
    purchase: Boolean
  }
]
~~~


**getUsersKey()** - returns an array of objects, where each object has key ,useId,favs,ingredient_id and grocery_id
~~~
[
  {
    key:String,
    userId: String,
    favs:Boolean,
    ingredient_id:Number,
    grocery_id: Number

  }
]
~~~

**getIngredientsKey()** - returns an array of objects, where each object has generated ingredient_id,fav,name,description,
custom,created and updated date,id and department_id
~~~
[
  {
     ingredient_id:String,
    favs: String,
    name: String,
    description: String,
    custom: Boolean,
    created_at: Date,
    updated_at: Date,
    id_1: Number,
    department_id: Number

  }
]
~~~

**getGroceryKey()** - returns an array of objects, where each object has generated grocery_id,favs,name,img
slug,created and updated date,id and description
~~~
[
  {
     grocery_id:String,
    name: :String,
    img: :Boolean,
    desc: :String,
    slug: :Boolean,
    created_at:Date,
    updated_at:Date,
    id_1: Number,
    favs: Boolean

  }
]
~~~



## Generate Array API



**generateArrWithId(data, idName)** - return an array of objects, where each object has autogenerated ID.
Output:
~~~~
[
  {
    ...item,
    id: __generatedID
  },
]
~~~~


**getKeyArrayDepAndIng()** - returns an array of objects, where each object  stores ingredient key as department key
~~~
[
  {
    key:String
  }
]
~~~


[![Build Status](https://travis-ci.org/GroceriStar/sd.svg?branch=master)](https://travis-ci.org/GroceriStar/sd)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)



#### Additional information
xxx

#### Installation

`npm install @groceristar/static-data-generator`

or

`yarn add @groceristar/static-data-generator`



#### Code Example

xxx

---

#### Tests

```
npm test
```

#### Contributors

@vadim9999, @atherdon, @AndrewSerra, @amogh-jrules, @svr8, @Edebo

#### structure
![image](https://user-images.githubusercontent.com/1469198/56497029-9a07fc80-6504-11e9-91ca-0aa4a3ec1ef8.png)

![image](https://user-images.githubusercontent.com/1469198/56497034-9eccb080-6504-11e9-8ca9-0ef32903d927.png)


#### ESLint fix

` npm run code-fix` or
`yarn code-fix`


#### List of plugins related to this universe:

- https://github.com/GroceriStar/food-datasets-csv-parser
- https://github.com/GroceriStar/groceristar-fetch

- https://github.com/GroceriStar/es6-package

- https://github.com/GroceriStar/sd/

- https://github.com/GroceriStar/sd-plain

---

```
"files": [
   "dist/*.js",
   "dist/*.d.ts",
   "bin/rollup"
 ]
 ```
---

https://www.npmjs.com/package/type-detect
