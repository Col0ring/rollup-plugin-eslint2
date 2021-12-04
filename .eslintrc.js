const prettierConfig = require('./prettier.config')

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['warn', prettierConfig],
  },
}
