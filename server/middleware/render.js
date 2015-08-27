import React    from 'react';
import Router   from 'react-router';
import Location from 'react-router/lib/Location';
import config   from '../../config';

const Root   = require(config.inSrc('containers/root.jsx'));
const routes = require(config.inSrc('routes/index.jsx'));

function renderIntoTemplate (template, content) {
  return template.replace('{content}', content);
}

function *route (path, query) {
  return new Promise(function (resolve, reject) {
    const location = new Location(path, query);

    Router.run(routes, location, function (err, initialState, transition) {
      if (err) {
        reject(err);
      } else if (!initialState) {
        reject(new Error('No initial state for ' + path));
      }

      resolve(initialState);
    });
  });
}

module.exports = function makeRenderRouteMiddleware (template) {
  return function *renderRouteMiddleware (next) {
    try {
      const state = yield route(this.request.path, this.request.query);

      this.body = renderIntoTemplate(
        template,
        React.renderToString(<Root initialState={state} />)
      );
    } catch (e) {
      console.log(e);
      yield next;
    }
  };
};
