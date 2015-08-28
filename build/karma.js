import webpack       from 'webpack';
import config        from '../config';
import webpackConfig from './webpack/client';

function makeKarmaConfig () {
  const preprocessors = {};

  preprocessors[config.KARMA_ENTRY] = ['webpack'];
  preprocessors[config.SRC_DIRNAME + '/**/*.js'] = ['webpack'];

  return {
    files : [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      config.inProject(config.KARMA_ENTRY)
    ],
    singleRun  : config.__PROD__,
    frameworks : ['chai', 'mocha'],
    preprocessors : preprocessors,
    reporters : ['spec'],
    browsers : ['PhantomJS'],
    webpack : {
      devtool : 'inline-source-map',
      resolve : webpackConfig.resolve,
      plugins : [
        new webpack.DefinePlugin(config.defineGlobals('client')),
        new webpack.optimize.DedupePlugin(),
      ],
      module : {
        loaders : webpackConfig.module.loaders
      }
    },
    webpackMiddleware : {
      noInfo : true
    },
    plugins : [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ]
  };
}

module.exports = function (karmaConfig) {
  return karmaConfig.set(makeKarmaConfig());
};
