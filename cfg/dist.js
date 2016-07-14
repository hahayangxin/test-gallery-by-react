'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap', // 在output的时候生成map文件，方便调试
  plugins: [
    new webpack.optimize.DedupePlugin(),  // 用来检测文件中相似的文件或文件中重复的内容，将这些冗余在output中消除掉
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),  // 用来排序引用模块的bounded id，引用的越频繁，id越短，来达到减小文件大小的目的
    new webpack.optimize.AggressiveMergingPlugin(), // 用来优化生成的代码段，提取相似的部分来生成公共的部分
    new webpack.NoErrorsPlugin()  // 用来保证编译过程不能出错
  ],
  output: { // 在index.html中引入的/assets/app.js就是根据这里的配置来的
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: "./assets/"
  },
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
