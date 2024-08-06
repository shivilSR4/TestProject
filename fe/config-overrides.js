const path = require('path');

module.exports = function override(config, env) {
  config.output = {
    ...config.output,
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  };

  return config;
};
