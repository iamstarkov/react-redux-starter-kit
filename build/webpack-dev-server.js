const webpack = require('webpack'),
      config  = require('../config'),
      WebpackDevServer = require('webpack-dev-server'),
      webpackConfig = require('./webpack/client');

const server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase : config.inProject(config.SRC_DIRNAME),
  publicPath : webpackConfig.output.publicPath,
  hot    : true,
  quiet  : config.QUIET_MODE,
  noInfo : config.QUIET_MODE,
  lazy   : false,
  inline : true,
  stats  : {
    colors : true
  },
  historyApiFallback : true
});

module.exports = exports = server;
