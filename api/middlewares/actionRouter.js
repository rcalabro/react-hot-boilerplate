import * as actions from '../actions/index';

function mapUrl(availableActions = {}, url = []) {
  const notFound = { action: null, params: [] };

  // test for empty input
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  /*eslint-disable */
  const reducer = (prev, current) => {
    if (prev.action && prev.action[current]) {
      return {action: prev.action[current], params: []}; // go deeper
    } else {
      if (typeof prev.action === 'function') {
        return {action: prev.action, params: prev.params.concat(current)}; // params are found
      } else {
        return notFound;
      }
    }
  };
  /*eslint-enable */

  const actionAndParams = url.reduce(reducer, { action: availableActions, params: [] });

  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}

export default function actionRouter() {
  return (req, res) => {
    const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

    const { action, params } = mapUrl(actions, splittedUrlPath);

    if (action) {
      action(req, params)
        .then((result) => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
        }, (reason) => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect);
          } else {
            console.error('ACTION', reason);
            res.status(reason.status || 500).json(reason);
          }
        });
    } else {
      res.status(404).end('NOT FOUND');
    }
  };
}
