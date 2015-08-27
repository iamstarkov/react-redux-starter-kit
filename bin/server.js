require('babel/register')({
  stage : 0
});

GLOBAL.__CLIENT__ = false;
GLOBAL.__SERVER__ = true;
GLOBAL.__DEBUG__  = false;

var config = require('../config'),
    server = require('../server');

server.listen(config.SERVER_PORT);
console.log('Koa server listening on port: ' + config.SERVER_PORT);
