module.exports = {
  plugins: ['import', 'prettier'],
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  globals: {
    use: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'error',
    'camelcase': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',

    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-globals': 'off',
  },
};
