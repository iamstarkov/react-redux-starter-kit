import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../config';
import webpackConfig from './webpack/client';

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

export default server;
