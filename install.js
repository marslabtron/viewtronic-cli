#!/usr/bin/env node

var version = require('./package').version.replace(/-.*/, '')

var fs = require('fs')
var os = require('os')
var path = require('path')
var nugget = require('nugget')
var extract = require('extract-zip')

var installedVersion = null
try {
  installedVersion = fs.readFileSync(path.join(__dirname, 'dist', 'app/version'), 'utf-8').replace(/^v/, '').trim('\n');
} catch (err) {
  // do nothing
}

var platform = os.platform()

function onerror (err) {
  throw err
}

//当前只支持 mac osx
var paths = {
  darwin: ['dist/Electron.app/Contents/MacOS/Electron','dist/app']
}

if (!paths[platform]) throw new Error('Unknown platform: ' + platform)

if (installedVersion === version && fs.existsSync(path.join(__dirname, paths[platform][0]))) {
  process.exit(0)
}

//暂用七牛
var zipName = 'viewtronic-'+version+'.zip';
var zipPath = 'http://7xnqxb.com1.z0.glb.clouddn.com/'+zipName;
nugget(zipPath,{},extractFile);

function extractFile (err) {
  if (err) return onerror(err);
  fs.writeFile(path.join(__dirname, '.paths'), paths[platform].join('\n'), function (err) {
    if (err) return onerror(err)
    extract(path.join(__dirname,zipName), {dir: path.join(__dirname, 'dist')}, function (err) {
      if (err) return onerror(err)
    })
  });
}
