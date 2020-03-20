module.exports = {
  presets: ['@vue/app', ['@babel/preset-env', { modules: false }]],
  plugins: [
    [
      'import',
      {
        libraryName: 'iview',
        libraryDirectory: 'src/components'
      }
    ],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ['transform-class-properties']
  ]
};
