module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'airbnb',
    'prettier',
  ],
  globals: {
    JSX: 'readonly',
    BillionGraves: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['import', 'react', 'prettier', '@typescript-eslint', 'react-hooks'],
  rules: {
    // When this is on we get errors importing tsx files into js files
    'import/extensions': 'off',

    '@typescript-eslint/ban-types': 'warn',

    // Let the dev decide
    'import/prefer-default-export': 'off',

    // Allow us to change properties of arguments
    'no-param-reassign': ['error', { props: false }],

    // We need this to get prettier working with eslint
    'prettier/prettier': ['error'],

    // We don't need to import React when using Next.js
    'react/react-in-jsx-scope': 'off',

    // Allows us to use JSX in js files
    'react/jsx-filename-extension': 'off',

    // Allows us to spread props
    'react/jsx-props-no-spreading': 'off',

    'max-len': ['error', { code: 120 }],

    // Wouldn't mind this if it could autofix but it's just a style preference
    // and I get tired if it nagging me.
    'react/jsx-one-expression-per-line': 'off',

    // When using Link, we specify the href on Link instead of a.
    // Link will add it to a so we leave it off. This disables
    // warnings about a not having an href in JSX.
    'jsx-a11y/anchor-is-valid': 'off',

    // We are using TypeScript instead of PropTypes
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    // Linting for React hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Allow unary operators
    'no-plusplus': 'off',

    // @typescript-eslint takes care of this for us.
    // Using eslint's rule leads to false positives in function type definitions.
    'no-unused-vars': 'off',

    // Sometimes we just need to disable it. But we shouldn't have to
    // add an eslint comment ignore the tslint ignore, so we just disable this.
    '@typescript-eslint/ban-ts-comment': 'off',

    // Allow enums
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    camelcase: 'off',
  },
  overrides: [
    {
      // Don't complain about imports being listed in dev deps instead of main deps in tests.
      // Our tests use lots of libs that we only have for testing.
      files: ['*.test.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      // Disable no-undef becuase tslint does it better than eslint.
      // eslint-disable-next-line max-len
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      files: ['*.tsx', '*.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  settings: {
    // allows us to import TSX files into JS files.
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
