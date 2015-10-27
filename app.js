var debug = require('debug')('app'),
  error = require('debug')('app:error');

function checkForData() {
  debug("Launching for new data");

  var promise = new Promise(require('./web/fetch').fetch);

  promise
    .then(require('./web/parse').parseTable, errorBinder("web/fetch"))
    //TODO: The function to compare
    //.then(require('./db/reader').compareFS, errorBinder("db/compare"))
    .then(require('./db/etl').operate, errorBinder("db/parse"));
}

function errorBinder(name) {
  return function(err) {
    error("Error Ocurred at: " + name + " the promise stopped");
    error(err);
  };
}

//Run this function every milliseconds * seconds * minutes * hours
setInterval(checkForData, 1000 * 60 * 3);

exports.check = checkForData;
