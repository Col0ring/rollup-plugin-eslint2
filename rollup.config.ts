import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import del from 'rollup-plugin-delete'
import path from 'path'
import pkg from './package.json'

export default {
  input: path.resolve(__dirname, './src/index.ts'),
  external: [...Object.keys(pkg.dependencies), 'path'],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'auto' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
    }),
    typescript({ sourceMap: false }),
    del({ targets: path.resolve(__dirname, './dist') }),
  ],
}
