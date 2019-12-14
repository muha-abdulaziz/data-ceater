module.exports = {
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'mocha'],
    env: {'mocha': true},
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
      'consistent-return': 0,
      'no-shadow': 0,
      'no-underscore-dangle': 0,
      'function-paren-newline': 0,
      'import/no-dynamic-require': 0,
      'no-console': 'off',
      'no-unused-vars': ['error'],
      'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
      'no-param-reassign': 0,
      'linebreak-style': [
        0
      ],
      'prefer-destructuring': ['error', { object: true, array: false }],
      // a rule for mocha test runner
      "mocha/no-exclusive-tests": "error"
    },
  };