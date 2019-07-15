
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
