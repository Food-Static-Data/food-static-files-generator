//     '**/*.+(js|md|ts|css|sass|less|graphql|yml|yaml|scss|json|vue)': [

// Custom Ignore
// const micromatch = require('micromatch')
// module.exports = {
//   '*.js': files => {
//     // from `files` filter those _NOT_ matching `*test.js`
//     const match = micromatch.not(files, '*test.js')
//     return match.map(file => `eslint ${file}`)
//   }
// }

// module.exports = {
//   "**/*.+(js|json)": [
//     //   'prettier --write',
//     //   'jest --findRelatedTests',
//     "npm run lint",
//     "git add"
//   ]
// }; "lint-staged": "lint-staged -c ./lint-staged.config.js",

module.exports = {
  '**/*.+(js)': [
    //   'eslint --fix',
    //   'prettier --write',
    //   'jest --findRelatedTests',
    'pretty-quick --staged',
    'npm run lint',
    'git add',
  ],
};
