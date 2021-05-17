module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: {
      globals: true
    }
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'standard',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest/all'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest'
  ],
  rules: {
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
