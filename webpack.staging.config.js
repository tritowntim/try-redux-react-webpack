//extend webpack.config.js
var config = require('./webpack.config');
var path = require('path');

//for more info, look into webpack.config.js
//this will add a new object into default settings
config.output = {
  path: path.resolve('release'),
  filename: 'app.[hash].js',
  publicPath: '/'
},

module.exports = config;
