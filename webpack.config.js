var webpack = require('webpack');

var config = {
  entry: {
    'custom-element': './src/element.js'
  },

  output: {
    path: './build',
    filename: '[name].js'
  },

  // this is the fastest of the source map options
  devtool: 'eval',

  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  // for production, use actual source maps
  config.devtool = 'source-map';

  var uglify = new webpack.optimize.UglifyJsPlugin({
    compress: true
  });

  config.plugins.push(uglify);
}

module.exports = config;
