import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

import { peerDependencies } from './package.json'

const formats = ['esm', 'umd']

export default {
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
    ...Object.keys(peerDependencies || {}),
  ]
}
