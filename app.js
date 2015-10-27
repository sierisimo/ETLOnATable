var debug = require('debug')('app');

function checkForData() {
  debug("Launching for new data");

  var promise = new Promise(require('./web/fetch').fetch);

  promise
    .then(require('./web/parse').parseTable, errorBinder("web/fetch"))
    .then(require('./db/writer').write, errorBinder("db/parse"))
    .then(function() {

    }, errorBinder("db/writer"));
}

function errorBinder(name) {
  return function(err) {
    debug("Error Ocurred at: " + name + " the promise stopped");
    debug(err);
  };
}

//Run this function every milliseconds * seconds * minutes * hours
setInterval(checkForData, 1000 * 10);

exports.check = checkForData;
