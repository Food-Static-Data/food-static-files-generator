// import cleanup from 'rollup-plugin-cleanup';
// import copy from 'rollup-plugin-cpy';
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

// packages that should be treated as external dependencies, not bundled
// e.g. ['axios']
const external = [
  'fs',
  'path',
  'uuid/v1',
  'lodash',
  'path-exists',
  'dayjs'
]


// list of plugins used during building process
const plugins = () => ([

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

  // use Babel to compile TypeScript/JavaScript files to ES5
  babel({
    extensions,
    include: ['src/*'],
    // ignore node_modules/ in transpilation process
    exclude: 'node_modules/**',
    // ignore .babelrc (if defined) and use options defined here
    // babelrc: false,
    // use recommended babel-preset-env without es modules enabled
    // and with possibility to set custom targets e.g. { node: '8' }
    // presets: [['env', { modules: false, targets }]],
    // solve a problem with spread operator transpilation https://github.com/rollup/rollup/issues/281
    // plugins: ['babel-plugin-transform-object-rest-spread'],
    // removes comments from output
    comments: false,
  }),

  // Compile TypeScript/JavaScript files


  builtins(),
  // remove flow annotations from output
  // flow(),

  // copy Flow definitions from source to destination directory
  // copy({
  //   files: ['src/*.flow'],
  //   dest: 'dist',
  // }),
]);

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
  // source file / entrypoint
  input: 'src/index.js',
  // output configuration
  output: [{
      // output file location
      file: pkg.main,
      // format of generated JS file, also: esm, and others are available
      format: 'cjs'
    },
    {
      // output file location
      file: pkg.module,
      // format of generated JS file, also: esm, and others are available
      format: 'es',
      // format: 'esm',
      // add sourcemaps
      sourcemap: true
    },
    {
      // output file location
      file: pkg.browser,
      // format of generated JS file, also: esm, and others are available
      format: 'iife',
      // name visible for other scripts
      name
      // https://rollupjs.org/guide/en#output-globals-g-globals
      // globals: {}
    }
  ],

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external,

  // build es modules or commonjs
  plugins: plugins()
}
