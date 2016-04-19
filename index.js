var fs = require('fs')
var path = require('path')

var paths = fs.readFileSync(path.join(__dirname,'.paths'),'utf-8');
var argv = paths.split('\n');
module.exports = {
  electron: path.join(__dirname, argv[0]),
  app: path.join(__dirname, argv[1])
};
