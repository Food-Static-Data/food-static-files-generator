// import cleanup from 'rollup-plugin-cleanup';
// https://github.com/mjeanroy/rollup-plugin-prettier
// https://gitlab.com/IvanSanchez/rollup-plugin-file-as-blob

import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import eslint from "rollup-plugin-eslint"

// not all files you want to resolve are .js files
// Default: [ '.mjs', '.js', '.json', '.node' ]
const extensions = [
  '.js'
]

const name = 'StaticFilesGenerator'

const external = [
  'fs',
  'path',
  'uuid/v1',
  'lodash',
  'path-exists',
  'dayjs'
]

let plugins = [

  // Allows node_modules resolution
  resolve({
    extensions,

    // use "module" field for ES6 module if possible
    module: true, // Default: true

    // use "jsnext:main" if possible
    // – see https://github.com/rollup/rollup/wiki/jsnext:main
    //jsnext: true, // Default: false

    // use "main" field or index.js, even if it's not an ES6 module
    // (needs to be converted from CommonJS to ES6
    // – see https://github.com/rollup/rollup-plugin-commonjs
    main: true, // Default: true

    // some package.json files have a `browser` field which
    // specifies alternative files to load for people bundling
    // for the browser. If that's you, use this option, otherwise
    // pkg.browser will be ignored
    browser: true, // Default: false // fixes ERROR!!! randomBytes(16)
  }),

  //@TODO maybe we should do it for production only? not sure
  replace({
    include: ['node_modules/uuid/**'],
    delimiters: ['', ''],
    values: {
      'crypto.randomBytes': 'require(\'randombytes\')'
      //   "__BUILD_DATE__": () => new Date().toISOString(),
      //   "__VERSION__": fs.readFileSync("version", "utf8").trim()
    }
  }),

  // Allows verification of entry point and all imported files with ESLint.
  // @TODO fix and enable eslint for rollup
  // eslint({
  //   /* your options */
  //   fix:true,
  //   throwOnWarning:true,
  //   throwOnError:true

  // }),

  // Allow bundling cjs modules. Rollup doesn't understand cjs
  commonjs({
    ignore: [
      "conditional-runtime-dependency"
    ]
  }),

  // Compile TypeScript/JavaScript files
  babel({
    extensions,
    include: ['src/*'],
    exclude: [
      'node_modules/**',
      // '/src/data/__tests__',
      // '/src/data/json-tests'
    ]
    // exclude: 'node_modules/**'
    // presets: presets,
    // plugins: plugins
  }),

  builtins(),
]

// example for adding plugin for env only
// if(process.env.NODE_ENV == "production") {
//   console.log("[config] In production environment - minifying JS");
//   plugins.push(terser({
//     numWorkers: os.cpus().length,
//     compress: {
//       ecma: 6
//     }
//   }));
// }


export default {
  input: './src/index.js',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external,

  plugins,

  output: [{
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.browser,
      format: 'iife',
      name
      // https://rollupjs.org/guide/en#output-globals-g-globals
      // globals: {}
    }
  ]
}
