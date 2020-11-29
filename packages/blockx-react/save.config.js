import path from 'path'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import { dependencies, peerDependencies } from './package.json';

const formats = ['es', 'cjs']

export default {
  input: './src/index.tsx',
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript')
    }),
    babel(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    })
  ],
  output: formats.map(format => ({
    dir: path.join('dist', format),
    format,
    name: 'blockx-react',
    globals: {
      'react': 'React',
      'classnames': 'classNames',
      'lodash': 'lodash'
    },
    preserveModules: true
  })),
  external: id =>
    // Don't attempt to bundle dependencies and peerDependencies.
    peerDependencies[id] ||
    // Don't attempt to parse CSS modules.
    /module\.s?css$/.test(id)
}
