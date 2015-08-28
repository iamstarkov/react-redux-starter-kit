const config    = require('../../config'),
      webpackConfig    = require('../webpack/client'),
      KARMA_ENTRY_FILE = 'karma.entry.js';

function makeDefaultConfig () {
  const preprocessors = {};

  preprocessors[KARMA_ENTRY_FILE] = ['webpack'];
  preprocessors[config.SRC_DIRNAME + '/**/*.js'] = ['webpack'];

  return {
    files : [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      config.inProject(KARMA_ENTRY_FILE)
    ],
    frameworks : ['chai', 'mocha'],
    preprocessors : preprocessors,
    reporters : ['spec'],
    browsers : ['PhantomJS'],
    webpack : {
      devtool : 'inline-source-map',
      resolve : webpackConfig.resolve,
      plugins : webpackConfig.plugins,
      module  : {
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
  return karmaConfig.set(makeDefaultConfig());
};
