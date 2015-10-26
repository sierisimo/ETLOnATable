var debug = require('debug')('app');

function checkForData() {
  var fetcher = require('./web/fetch'),
    parser = require('./web/parse'),
    promise = new Promise(function(resolve, reject) {
      fetcher.fetch(resolve, reject);
    });

  promise.then(function(dataObj) {
    debug("Data is ready, calling to parse");
    return parser.parseTable(dataObj);
  }, function(err) {
    debug("Error Ocurred at promise when fetching:");
    debug(err);
  }).then(function(parsedArr){
    debug("Parsing finished, calling Database");

    //TODO:
  }, function(err){
    debug("Error Ocurred at promise when parsing:");
    debug(err);
  });
}

setInterval(function() {
  debug("Launching for new data");
  checkForData();
}, 1000 * 5); //Run this function every milliseconds * seconds * minutes * hours

exports.check = checkForData;
