var debugConstructor = require('debug'),
  debug = debugConstructor('app'),
  fetcher = require('./web/fetch');

function checkForData(){
  var promise = new Promise(function(resolve, reject){
      fetcher.fetch(resolve, reject);
  });

  promise.then(function(data){

  }, function(err){

  });
}

setInterval(function () {
  debug("Launching for new data");
  checkForData();
}, 1000 * 60); //Run this function every milliseconds * seconds * minutes * hours

exports.check = checkForData;
