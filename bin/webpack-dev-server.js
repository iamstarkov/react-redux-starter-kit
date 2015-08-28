require('babel/register');

const config = require('../config'),
      server = require('../build/webpack-dev-server');

server.listen(config.WEBPACK_PORT, 'localhost', function () {
  console.log('Webpack dev server running at localhost:' + config.WEBPACK_PORT);
});
