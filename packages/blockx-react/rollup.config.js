const path = require('path')
const babel = require('@rollup/plugin-babel').default
const typescript = require('rollup-plugin-typescript2')
const commonjs = require("@rollup/plugin-commonjs")
const postcss = require("rollup-plugin-postcss")
const copy = require('rollup-plugin-cpy')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

const { dependencies, peerDependencies } = require('./package.json')

const formats = [{
  name: 'es',
  preserveModules: true,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript')
    }),
    babel(),
    nodeResolve(),
    commonjs(),
    copy({
      files: ['**/*.scss', '**/*.css', '!dist/**'],
      dest: path.join('dist', 'es'),
      options: {
        parents: true,
      }
    }),
  ],
  external: id =>
    // Don't attempt to bundle dependencies and peerDependencies.
    peerDependencies[id] ||
    // Don't attempt to parse CSS modules.
    /module\.s?css$/.test(id)
}, {
  name: 'cjs',
  preserveModules: false,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript')
    }),
    babel(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    nodeResolve(),
    commonjs()
  ],
  external: id =>
    // Don't attempt to bundle dependencies and peerDependencies.
    peerDependencies[id]
}]

module.exports = formats.map(format => ({
  input: './src/index.tsx',
  plugins: format.plugins,
  output: {
    dir: path.join('dist', format.name),
    format: format.name,
    preserveModules: format.preserveModules
  },
  external: format.external
}))
