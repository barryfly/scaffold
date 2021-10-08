
module.exports = function(api) {
  api.cache(true);

  return {
    "presets": ["@babel/preset-env","@vue/babel-preset-jsx"],
    "comments": true,
    "plugins": [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import",
      ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }]
    ]
  };
}