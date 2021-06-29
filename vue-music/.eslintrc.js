module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    semi: [2, 'never'],
    'comma-dangle': ['error', 'never'],
    'vue/no-multiple-template-root': 'off'
  }
}
