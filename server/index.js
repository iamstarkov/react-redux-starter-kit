const fs     = require('fs'),
      koa    = require('koa'),
      serve  = require('koa-static'),
      config = require('../config');

const app = koa();

// ------------------------------------
// Response Time Header and Logging
// ------------------------------------
app.use(require('./middleware/response-time'));
app.use(require('./middleware/logger'));

// ------------------------------------
// Static File Middleware
// ------------------------------------
app.use(serve(config.inProject(config.DIST_DIRNAME)));

// ------------------------------------
// View Rendering
// ------------------------------------
const template = `
  <!doctype html>
  <html lang="en">
  <head>
    <title>React Redux Starter Kit</title>
  </head>
  <body>
    <div id="root">{content}</div>
    <script src="/vendor.js"></script>
    <script src="/app.js"></script>
  </body>
  </html>
`;

app.use(require('./middleware/render')(template));

module.exports = app;
