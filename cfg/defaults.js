'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;
function getDefaultModules() {
  return {
    // 这里的loaders也用来解释为什么可以require css image等
    preLoaders: [{  // preLoaders会优先于loaders执行，根据配置的.eslintrc文件来效验js代码
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }],
    loaders: [
      {
        test: /\.css$/,
        // 这里给css文件指定三个loader，!的作用类似于管道，注意这里的loader从右到左依次执行(css-loader对postcss-loader处理后的文件进行处理)
        // css-loader会遍历sass编译后的css文件，查找url表达式并解析其中的内容
        // style-loader也用来处理css文件，不同之处是它会把css插入到页面中或js bound中
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.sass/,
        // querystring的形式指定loader的相关项
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        // 处理图片，返回图片的url地址，limit指定了当图片小于8KB时，直接返回图片的base64编码的值，不返回url
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  }
};