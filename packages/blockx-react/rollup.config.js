import path from 'path'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import copy from 'rollup-plugin-cpy';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import { dependencies, peerDependencies } from './package.json';

const resolveOnly = [
  "@yumastudio/blockx-icons",
  "intersection-observer",
  "object-fit-images",
  "style-inject"
]

const formats = [{
  name: 'es',
  preserveModules: true,
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript')
    }),
    babel(),
    nodeResolve({
      resolveOnly
    }),
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

export default formats.map(format => ({
  input: './src/index.tsx',
  plugins: format.plugins,
  output: {
    dir: path.join('dist', format.name),
    format: format.name,
    preserveModules: format.preserveModules
  },
  external: format.external
}))
