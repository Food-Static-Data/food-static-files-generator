const { generateArrWithId } = require('./utils');

function favorites() {
  var groceryId = generateArrWithId(files.grocery, 'grocery_id');
  var usersId = generateArrWithId(files.users, 'user_id');
  var ingredientsId = generateArrWithId(
    files.ingredients,
   'ingredient_id'
 );

  const result = [];

  _.map(usersId, (user, index) => {
    result.push({
      ingredient_id: ingredientsId[index++].ingredient_id,
      user_id: user.user_id,
      favs: `desc for department${index}`,
      // one grocery id for all users
      grocery_id: groceryId[index++].grocery_id,
    });
  });

  return result;
}

function usersGrocery() {
  const groceryId = generateArrWithId(grocery, 'grocery_id');
  const usersId = generateArrWithId(users, 'user_id');
  // return object for three users
  const result = [];

  _.map(usersId, (user, index) => {
    result.push({
      user_id: user.user_id,
      // one grocery id for all users
      grocery_id: groceryId[index++].grocery_id,
    });
  });
  return result;
}

module.exports = {
  favorites,
  usersGrocery
}
