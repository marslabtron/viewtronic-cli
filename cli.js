#!/usr/bin/env node

var electron = require('./').electron;
var app = require('./').app;

var proc = require('child_process')
var argv = process.argv.slice(2);
argv.unshift(app);

var child = proc.spawn(electron, argv, {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code)
});
