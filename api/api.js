import express from 'express';
import http from 'http';
import session from 'express-session';
import bodyParser from 'body-parser';
import { actionRouter } from './middlewares';

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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(actionRouter());

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('API running on port %s', port);
})
