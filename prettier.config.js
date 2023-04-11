module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.mdx',
      options: {
        printWidth: 80,
        semi: true,
      },
    },
  ],
}
