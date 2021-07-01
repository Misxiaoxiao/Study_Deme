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
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.ts', '.js', '.jsx', '.json', '.vue']
      }
    }
  },
  rules: {
    semi: [2, 'never'],
    'comma-dangle': ['error', 'never'],
    'vue/no-multiple-template-root': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'import/no-self-import': 'off',
    'import/no-cycle': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-useless-path-segments': 'off',
    'space-before-function-paren': ['always']
  }
}
