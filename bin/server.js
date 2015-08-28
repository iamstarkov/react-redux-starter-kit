require('babel/register')({
  stage : 0
});

const config = require('../config');
Object.assign(GLOBAL, config.defineGlobals('server'));

const server = require('../server');
server.listen(config.SERVER_PORT);
console.log('Koa server listening on port: ' + config.SERVER_PORT);
