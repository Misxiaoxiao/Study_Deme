const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
// const sass = require('rollup-plugin-sass')

const inputPath = path.resolve(__dirname, './src/index.js')
const outputUMDPath = path.resolve(__dirname, './dist/datav.js')
const outputESPath = path.resolve(__dirname, './dist/datav.es.js')

module.exports = {
  input: inputPath,
  output: [{
    file: outputUMDPath,
    format: 'umd',
    name: 'datav',
    globals: {
      vue: 'vue'
    }
  }, {
    file: outputESPath,
    format: 'es',
    name: 'datav',
    globals: {
      vue: 'vue'
    }
  }],
  plugins: [
    resolve(),
    vue(),
    postcss({
      plugins: []
    }),
    json(),
    commonjs(),
    // sass(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['vue']
}
