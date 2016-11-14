var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'webpack-hot-middleware/client',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  }
};
