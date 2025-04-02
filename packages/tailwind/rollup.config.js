import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json' with { type: 'json' };

const config = {
  input: 'src/index.ts',
  output: { format: 'es', file: 'lib/index.js' },
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies), /@react-pdf/],
  plugins: [typescript(), localResolve()],
};

const dtsConfig = {
  input: 'src/index.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts()],
};

export default [config, dtsConfig];
