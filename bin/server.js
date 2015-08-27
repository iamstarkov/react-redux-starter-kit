require('babel/register')({
  stage : 0
});

Object.assign(GLOBAL, require('../config/define-globals')('server'));

const config = require('../config'),
      server = require('../server');

server.listen(config.SERVER_PORT);
console.log('Koa server listening on port: ' + config.SERVER_PORT);
