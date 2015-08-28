process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const resolve = require('path').resolve,
      argv    = require('yargs').argv,
      _slice  = [].slice;

const SRC_DIRNAME  = 'client',
      DIST_DIRNAME = 'dist',
      PROJECT_PATH = resolve(__dirname, '../');

function inProject () {
  return resolve.apply(resolve, [PROJECT_PATH].concat(_slice.apply(arguments)));
}

// ------------------------------------
// Configuration Definition
// ------------------------------------
const config = {

  // environment globals
  NODE_ENV  : process.env.NODE_ENV,
  __DEBUG__ : !!argv.debug,
  __DEV__   : process.env.NODE_ENV === 'development',
  __PROD__  : process.env.NODE_ENV === 'production',

  // configuration flags
  QUIET_MODE : !!argv.quiet,

  // path helpers
  SRC_DIRNAME  : SRC_DIRNAME,
  DIST_DIRNAME : DIST_DIRNAME,
  PROJECT_PATH : PROJECT_PATH,
  inProject : inProject,
  inSrc     : inProject.bind(undefined, SRC_DIRNAME),
  inDist    : inProject.bind(undefined, DIST_DIRNAME),

  // build system
  VENDOR_DEPENDENCIES : [
    'immutable',
    'react',
    'react-redux',
    'react-router',
    'redux',
    'redux-devtools',
    'redux-devtools/lib/react'
  ],

  // server configuration
  HOST         : 'localhost',
  WEBPACK_PORT : 3001,
  SERVER_PORT  : process.env.PORT || 3000,

  // karma configuration
  KARMA_ENTRY : 'karma.entry.js'
};

// global definitions helper
config.defineGlobals = function (target) {
  target = target.toLowerCase();

  return {
    __CLIENT__    : target === 'client',
    __SERVER__    : target === 'server',
    __DEBUG__     : config.__DEBUG__,
    __DEV__       : config.__DEV__,
    __PROD__      : config.__PROD__,
    'process.env' : {
      'NODE_ENV' : JSON.stringify(config.NODE_ENV)
    }
  };
};

module.exports = exports = config;
