import { dts } from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import localResolve from 'rollup-plugin-local-resolve';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';

import pkg from './package.json' with { type: 'json' };

const config = {
  input: 'src/index.ts',
  output: { format: 'es', file: 'lib/index.js' },
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies), /@react-pdf/, 'react', 'react-dom'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      compilerOptions: {
        declaration: false,
      },
      exclude: ['**/*.test.ts', '**/*.test.tsx']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    localResolve(),
    json(),
  ],
};

const cliConfig = {
  input: 'src/cli.ts',
  output: { format: 'es', file: 'lib/cli.js', banner: '#!/usr/bin/env node' },
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies), 'fs', 'path', 'child_process'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      compilerOptions: {
        declaration: false,
      },
      exclude: ['**/*.test.ts', '**/*.test.tsx']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      extensions: ['.js', '.ts'],
    }),
    localResolve(),
    json(),
  ],
};

const dtsConfig = {
  input: 'src/index.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts()],
};

export default [config, cliConfig, dtsConfig];
