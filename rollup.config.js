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


const extensions = [
  '.js'
]

const name = 'StaticFilesGenerator'

const external = [
  'fs',
  'path',
  'uuid'
]

let plugins = [

  // Allows node_modules resolution
  resolve({
    extensions,
    browser: true, // fixes ERROR!!! randomBytes(16)
  }),

  //@TODO maybe we should do it for production only? not sure
  replace({
    include: ['node_modules/uuid/**'],
    delimiters: ['', ''],
    values: {
      'crypto.randomBytes': 'require(\'randombytes\')'
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
    include: [
      'node_modules/path-exists/**',
      'node_modules/uuid/**',
      'node_modules/dayjs/**',
    ],
    exclude: 'node_modules/lodash/**',
    // include: 'node_modules/**',
    ignore: [
      "conditional-runtime-dependency"
    ]
  }),

  // Compile TypeScript/JavaScript files
  babel({
    extensions,
    include: ['src/*'],
    // include: ['src/**/*'],
    exclude: [
      'node_modules/**',
      // '/src/data/__tests__',
      'src/settings.json'
      // '/src/data/json-tests'
    ]
    // exclude: 'node_modules/**'
    // presets: presets,
    // plugins: plugins
  }),

  builtins(),
]

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
