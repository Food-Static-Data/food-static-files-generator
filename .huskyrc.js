// "hooks": {
//   "pre-commit": "npm run lint-staged && npm run clean && npm run formato && npm run build",
//   "after": "lint-staged -c ./lint-staged.config.js",
//   "then": "yarn precommit"
// }

module.exports = {
  hooks: {
    "pre-commit": "yarn run lint-staged"
  }
};
