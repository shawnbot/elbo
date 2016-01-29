var webpack = require('webpack');

var config = {
  entry: {
    'elbo': './lib/bundle.js'
  },

  output: {
    path: './build',
    filename: '[name].js'
  },

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
