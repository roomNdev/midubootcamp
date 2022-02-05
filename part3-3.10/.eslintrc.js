module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'eqeqeq': 'warn',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
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
    ]
  }
}
