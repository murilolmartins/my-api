module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },

  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],

  extends: ['standard-with-typescript', "plugin:prettier/recommended"],

  ignorePatterns: ['.eslintrc.js'],

  rules: {
    'no-undef': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    "@typescript-eslint/return-await": "off",
    "no-console": "warn",
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: ['absolute', 'module', '/^@/', 'index'],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
};
