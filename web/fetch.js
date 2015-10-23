var jsdom = require("jsdom"),
  debugConstructor = require("debug"),
  debug = debugConstructor("fetcher"),
  wikiUrl = "https://en.wikipedia.org/wiki/Highest-income_metropolitan_statistical_areas_in_the_United_States";

function fetchTable(resolve, reject) {
  debug("Called for a fetch.");
  jsdom.env({
    url: wikiUrl,
    done: function(err, window) {
      if (err) {
        debug("Error happend fetching web");
        reject(err);
      } else {
        debug("Checking the fetched data...");
        var document = window.document,
          table = document.getElementsByClassName('toccolours')
            .item(0)
            .getElementsByTagName('tbody').item(0);

        debug("Data fetched, <tbody> found!");
        debug("Sending data to parse...");

        resolve({data:table, document: document});
      }
    }
  });
}

exports.fetch = fetchTable;
