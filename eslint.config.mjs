import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  typescript: true,
  formatters: false,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single',
  },
  ignores: ['node_modules', 'dist', '**/migrations/*'],
}, {
  rules: {
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'node/prefer-global/process': ['off'],
    'node/no-process-env': ['error'],
    'perfectionist/sort-imports': ['error', {
      tsconfigRootDir: '.',
    }],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md'],
    }],
    'style/newline-per-chained-call': ['error'],
    'antfu/consistent-list-newline': ['error'],
  },
})
