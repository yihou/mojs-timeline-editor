module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  plugins: ['@typescript-eslint', '@emotion'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true
    }
  },
  rules: {
    'no-empty': 0,
    'no-console': 0,
    'no-unused-vars': [0, { varsIgnorePattern: '^h$' }],
    'no-use-before-define': 0,
    'no-cond-assign': 1,
    'import/no-default-export': 2,
    semi: 2,
    camelcase: 0,
    'comma-style': 2,
    'comma-dangle': [
      2,
      {
        objects: 'only-multiline',
        arrays: 'only-multiline',
        functions: 'only-multiline'
      }
    ],
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'no-trailing-spaces': [2, { skipBlankLines: true }],
    'max-nested-callbacks': [2, 3],
    'no-eval': 2,
    'no-implied-eval': 2,
    'no-new-func': 2,
    'guard-for-in': 2,
    eqeqeq: 0,
    'no-else-return': 2,
    'no-redeclare': 2,
    'no-dupe-keys': 2,
    radix: 2,
    strict: [2, 'never'],
    'no-shadow': 0,
    'no-delete-var': 2,
    'no-undef-init': 2,
    'no-shadow-restricted-names': 2,
    'handle-callback-err': 0,
    'no-lonely-if': 2,
    'keyword-spacing': 2,
    'constructor-super': 2,
    'no-this-before-super': 2,
    'no-dupe-class-members': 2,
    'no-const-assign': 2,
    'prefer-spread': 2,
    'no-useless-concat': 2,
    'no-var': 2,
    'object-shorthand': 2,
    'prefer-arrow-callback': 2,
    'standard/computed-property-even-spacing': 0,
    'no-template-curly-in-string': 0,
    'no-undef': 0,
    'import/no-duplicates': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0
  }
}
