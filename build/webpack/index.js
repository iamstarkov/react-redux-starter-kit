const assign  = require('object-assign'),
      webpack = require('webpack'),
      config  = require('../../config'),
      globals = require('../../config/define-globals');

const publicPath = (
  'http://' + config.HOST + ':' + config.WEBPACK_PORT + '/' + config.DIST + '/'
);

const webpackConfig = {
  target : 'web',
  output : {
    filename   : '[name].js',
    path       : config.inProject(config.DIST_DIRNAME),
    publicPath : publicPath
  },
  entry : {
    app : [
      config.inSrc('entry-points/client')
    ]
  },
  plugins : [
    new webpack.DefinePlugin(globals('client')),
    new webpack.optimize.DedupePlugin()
  ],
  resolve : {
    extensions : ['', '.js', '.jsx']
  },
  module : {
    preLoaders : [
      {
        test : /\.(js|jsx)$/,
        loaders : ['eslint-loader'],
        include : config.inProject(config.SRC_DIRNAME)
      }
    ],
    loaders : [
      {
        test : /\.(js|jsx)$/,
        include : config.inProject(config.SRC_DIRNAME),
        loaders : ['babel?optional[]=runtime&stage=0']
      },
      {
        test : /\.scss$/,
        loaders : [
          'style-loader',
          'css-loader',
          'autoprefixer?browsers=last 2 version',
          'sass-loader?includePaths[]=' + config.inSrc('styles')
        ]
      }
    ]
  },
  eslint : {
    configFile  : config.inProject('.eslintrc'),
    failOnError : config.__PROD__
  }
};

// ----------------------------------
// Environment-Specific Defaults
// ----------------------------------
if (config.__DEV__) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

if (config.__PROD__) {
  webpackConfig.entry.vendor = config.VENDOR_DEPENDENCIES;

  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', '[name].js'
    ),
    new webpack.optimize.UglifyJsPlugin({
      output : {
        'comments'  : false
      },
      compress : {
        'unused'    : true,
        'dead_code' : true
      }
    })
  );
}

module.exports = exports = webpackConfig;
