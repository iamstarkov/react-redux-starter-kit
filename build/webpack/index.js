const assign  = require('object-assign'),
      webpack = require('webpack'),
      config  = require('../../config');

const publicPath = (
  'http://' + config.HOST + ':' + config.WEBPACK_PORT + '/' + config.DIST + '/'
);

const webpackConfig = {
  target  : 'web',
  output : {
    filename   : '[name].js',
    path       : config.inProject(config.DIST_DIRNAME),
    publicPath : publicPath
  },
  entry  : {
    app : [
      config.inSrc('entry-points/client')
    ],
    vendor : config.VENDOR_DEPENDENCIES
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV' : JSON.stringify(config.NODE_ENV)
      },
      '__CLIENT__' : true,
      '__SERVER__' : false,
      '__DEBUG__'  : config.__DEBUG__,
      '__PROD__'   : config.__PROD__,
      '__DEV__'    : config.__DEV__
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', '[name].js'
    )
  ],
  resolve : {
    extensions : ['', '.js', '.jsx'],
    alias : [
      'actions',
      'components',
      'constants',
      'containers',
      'dispatchers',
      'layouts',
      'models',
      'reducers',
      'routes',
      'services',
      'stores',
      'styles',
      'utils',
      'views'
    ].reduce(function (acc, x) {
      acc[x] = config.inSrc(x);
      return acc;
    }, {})
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
  webpackConfig.plugins.push(
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
