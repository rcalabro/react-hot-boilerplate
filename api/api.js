import express from 'express';
import http from 'http';
import session from 'express-session';
import bodyParser from 'body-parser';
import {mapUrl} from './utils/url.js';

import * as actions from './actions/index';

const port = 3030
const app = express();

const server = new http.Server(app);

app.use(session({
  secret: 'ads checkout secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());


app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

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
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('API running on port %s', port);
})
