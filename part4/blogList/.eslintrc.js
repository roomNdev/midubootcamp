module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
    'jest':true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'indent': [
      'warn',
      2
    ],
    'linebreak-style': [
      'warn',
      'windows'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'never'
    ],
    'no-unused-vars': [
      'warn',
      {'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false}      
    ]
  }
}
