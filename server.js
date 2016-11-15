var favicon = require('serve-favicon');
var url = require('url');
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var proxy = require('express-http-proxy');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use('/static', express.static(path.join(__dirname, 'static'), { maxAge: 31536000000 }));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
})
