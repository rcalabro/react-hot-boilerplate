var fs = require('fs')

var babelrc = fs.readFileSync('./.babelrc')
var config = config = JSON.parse(babelrc)

require('babel-register')(config)
require('./api/api')
