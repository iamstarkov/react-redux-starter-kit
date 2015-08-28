import webpack from 'webpack';
import config from '../../config';

const webpackConfig = {
  target : 'web',
  output : {
    filename   : '[name].js',
    path       : config.inProject(config.DIST_DIRNAME),
    publicPath : config.publicPath
  },
  entry : {
    app : [
      config.inSrc('entry-points/client')
    ],
    vendor : config.VENDOR_DEPENDENCIES
  },
  plugins : [
    new webpack.DefinePlugin(config.defineGlobals('client')),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', '[name].js'
    )
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
      }
      // {
      //   test : /\.scss$/,
      //   loaders : [
      //     'style-loader',
      //     'css-loader',
      //     'autoprefixer?browsers=last 2 version',
      //     'sass-loader?includePaths[]=' + config.inSrc('styles')
      //   ]
      // }
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
  webpackConfig.entry.app = [
    `webpack-dev-server/client?${config.publicPath}`,
    'webpack/hot/only-dev-server',
    ...webpackConfig.entry.app
  ];

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
    if (/js/.test(loader.test)) {
      loader.loaders.unshift('react-hot');
    }
    return loader;
  });
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
