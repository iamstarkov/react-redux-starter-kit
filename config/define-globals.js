const config = require('./index');

module.exports = function defineGlobals (target) {
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
