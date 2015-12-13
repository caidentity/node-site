var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// Create a route for each file.
getSubViews().forEach(function(dir) {
  router.get('/' + dir, function(req, res, next) {
    var subview = dir + '/' + dir;
    res.render(subview, {jsFiles: getJSFiles()});
  });
});

/* GET home page. */
router.get('*', function(req, res, next) {
  console.log('DEFAULT HOME');
  res.redirect('/home');
});

function getSubViews() {
  try {
    return fs.readdirSync(path.resolve(__dirname, '../views'))
        .filter(function(dir) { console.log(dir); return dir != 'base.jade'; });
  } catch(err) { console.log('err', err); }
}

function getJSFiles() {
  try {
    return fs.readdirSync(path.resolve(
        __dirname, '../public/js/third-party')).filter(function(file) {
      return ~file.indexOf('.js');
    }).map(function(filename) { return 'js/third-party/' + filename; });
  } catch(err) {
    console.log('ERROR GETTING JAVASCRIPT FILES. RUN gulp bower.');
  }
}

module.exports = router;
