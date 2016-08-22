'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,  // 开启loders的debug模式
  devtool: 'eval',
  output: { // 在index.html中引入的assets/app.js就是根据这里的配置来的
    path: path.join(__dirname, 'assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',  // 服务器对应的根目录
    historyApiFallback: true,
    hot: true,  // 在使用热更新的时候不仅需要引入webpack/hot/only-dev-server，同时需要把hot设为true
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath, // 服务器映射的目录
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],  // 例如： require("app")的时候，依次匹配app app.js app.jsx
    alias: {  // 配置路径的别名
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {}
};
