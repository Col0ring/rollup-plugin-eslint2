## rollup-plugin-eslint2

Forked from [@rollup/plugin-eslint](https://github.com/rollup/plugins/tree/master/packages/eslint), to resolve the conflict between @rollup/plugin-typescript and @rollup/plugin-eslint

## Install

Using npm:

```sh
npm install rollup-plugin-eslint2 --save-dev
# or
yarn add -D rollup-plugin-eslint2
```

## Usage

```js
import eslint from 'rollup-plugin-eslint2'

export default {
  input: 'main.js',
  plugins: [
    eslint({
      /* your options */
    }),
  ],
}
```

## Options

See more options here [eslint-config](http://eslint.org/docs/developer-guide/nodejs-api#cliengine).

You can also use eslint configuration in the form of a `.eslintrc.*` file in your project's root. It will be loaded automatically.

### fix

Type: `Boolean`<br>
Default: `false`

If true, will auto fix source code.

### throwOnError

Type: `Boolean`<br>
Default: `false`

If true, will throw an error if any errors were found.

### throwOnWarning

Type: `Boolean`<br>
Default: `false`

If true, will throw an error if any warnings were found.

### include

Type: `Array | String`<br>
Default: `[]`

A single file, or array of files, to include when linting.

### exclude

Type: `Array | String`<br>
Default: `node_modules/**`

A single file, or array of files, to exclude when linting.

### formatter

Type: `Function | String`<br>
Default: `stylish`

Custom error formatter or the name of a built-in formatter.
