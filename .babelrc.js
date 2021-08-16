module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      //  If you use @babel/preset-react or @babel/preset-typescript
      //  ensure that @emotion/babel-preset-css-prop is inserted after them in your babel config.
      '@emotion/babel-preset-css-prop',
      {
        sourceMap: true,
        autoLabel: 'dev-only',
      },
    ],
  ],
}
