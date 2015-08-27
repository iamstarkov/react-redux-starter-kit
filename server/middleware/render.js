const React  = require('react');
const config = require('../../config');

const Root = require(config.inSrc('containers/root.jsx'));

function renderIntoTemplate (template, content) {
  return template.replace('{content}', content);
}

module.exports = function makeRenderRouteMiddleware (template) {
  return function *renderRouteMiddleware (next) {
    this.body = renderIntoTemplate(template, React.renderToString(<Root />));
  };
};
