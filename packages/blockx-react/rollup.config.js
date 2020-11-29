import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import json from '@rollup/plugin-json';
import path from 'path'

import { peerDependencies } from './package.json'

const formats = ['es', 'cjs']

export default {
  input: './src/index.tsx',
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript')
    }),
    json(),
    babel(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    commonjs()
  ],
  output: formats.map(format => ({
    dir: path.join('dist', format),
    format,
    name: 'blockx-react',
    globals: {
      'react': 'React',
      'classnames': 'classNames',
      'lodash': 'lodash',
      'react-popper': 'react-popper',
      '@yumastudio/blockx-icons': '@yumastudio/blockx-icons'
    }
  })),
  external: [
    "@yumastudio/blockx-scss",
    "@popperjs/core",
    "classnames",
    "lodash",
    "react",
    "react-dom",
    "warning"
  ]
}
