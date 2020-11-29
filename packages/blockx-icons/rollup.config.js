const babel = require('@rollup/plugin-babel').default
const commonjs = require('@rollup/plugin-commonjs')

const pkg = require('./package.json')

const formats = ['esm', 'umd']

module.exports = {
  input: 'src/index.js',
  plugins: [
    babel(),
    commonjs()
  ],
  output: formats.map(format => ({
    file: `dist/index.${format}.js`,
    format,
    name: 'icons',
    globals: {
      'react': 'React'
    }
  })),
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ]
}
