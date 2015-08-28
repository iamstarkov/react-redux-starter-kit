import webpack from 'webpack';
import config from '../../config';
import makeDefaultWebpackConfig from './make-default-config';

const webpackConfig = Object.assign(makeDefaultWebpackConfig(), {
  target : 'node',
  output : {
    filename : 'index.js',
    path     : config.inDist('server'),
    libraryTarget : 'commonjs2'
  },
  preloaders : [],
  pugins
});

webpackConfig
webpackConfig.entry.app = [
  'webpack-dev-server/client?' + webpackConfig.output.publicPath,
  'webpack/hot/only-dev-server',
  config.inSrc('entry-points/server')
];

webpackConfig.entry.vendor = config.VENDOR_DEPENDENCIES;


module.exports = exports = webpackConfig;
