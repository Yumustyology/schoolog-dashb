module.exports = {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
